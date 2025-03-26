
 const parseWKT = (wkt) => {
  if (!wkt || !wkt.startsWith("MULTIPOLYGON")) {
    // If wkt is undefined, null, or not a MULTIPOLYGON, return an empty array
    return [];
  }

  try {
    // Extract coordinates from MULTIPOLYGON format
    const polygons = wkt
      .match(/MULTIPOLYGON\s*\(\(\(([^\)]+)\)\)\)/)[1] // Extract inner coordinates
      .split("),(") // Split each polygon group
      .map((polygon) =>
        polygon.split(",").map((point) => {
          const [lng, lat] = point.trim().split(" ");
          return [parseFloat(lat), parseFloat(lng)]; // Swap lat and lng for Leaflet
        })
      );
    return polygons;
  } catch (error) {
    console.error("Error parsing WKT:", error);
    return []; // Return empty array if parsing fails
  }
};

export default parseWKT