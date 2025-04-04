import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());


const PARKING_INVENTORY_API = "https://data.lacity.org/resource/s49e-q6j2.json";
const PARKING_OCCUPANCY_API = "https://data.lacity.org/resource/e7h6-4a3e.json";


function getDistance(userlat, userlong, lat, long) {
    var a = userlat - lat;
    var b = userlong - long;
    return Math.sqrt(a * a + b * b);
}


app.get('/parking', async (req, res) => {
    const { lat, long } = req.query;

    if (!lat || !long) {
        return res.status(400).json({ error: "No user location provided" });
    }

    const userLat = parseFloat(lat);
    const userLong = parseFloat(long);

    try {
        const [inventoryResponse, occupancyResponse] = await Promise.all([
            axios.get(PARKING_INVENTORY_API),
            axios.get(PARKING_OCCUPANCY_API)
        ]);

        const inventory = inventoryResponse.data;
        const occupancy = occupancyResponse.data;

        const vacantSpaceIds = new Set(
            occupancy
                .filter(item => item.occupancystate === "VACANT" && item.spaceid)
                .map(item => item.spaceid)
        );

        const closestData = inventory
            .filter(entry => 
                entry.latlng && 
                entry.latlng.latitude && 
                entry.latlng.longitude && 
                vacantSpaceIds.has(entry.spaceid)
            )
            .map(entry => ({
                ...entry,
                distance: getDistance(userLat, userLong, parseFloat(entry.latlng.latitude), parseFloat(entry.latlng.longitude))
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10); 



        res.setHeader("Content-Type", "application/json");
        res.send(closestData);

    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch parking data" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
