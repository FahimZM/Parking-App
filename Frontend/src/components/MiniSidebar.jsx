import React from "react";

const MiniSidebar = ({handleMenuClick, toggleDarkMode, isDarkMode}) => {
    return (
        <div className={`fixed top-5 bottom-5 left-5 h-95% w-[70px] bg-white shadow-lg p-5 rounded-xl z-10 flex flex-col justify-between items-center transition-all duration-300 border-2 border-primary bg-white border-[#1C293D] dark:bg-[#1E1E1E] dark:border-white`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={handleMenuClick}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <div className='flex flex-col space-y-4 mt-auto'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer" onClick={toggleDarkMode}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>

            </div>

        </div>
    )
}

export default MiniSidebar