import React from 'react';

const DriverInfo = () => {
    return (
        <div className="p-1 bg-cardBackground rounded-lg">
            {/* Driver Info */}
            <div className="flex items-center gap-4">
                <img
                    src={require("../../../assets/images/user/user-01.png")}
                    alt="Driver"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h2 className="text-[16px] font-semibold text-text2">BHASKAR MANGAL</h2>
                    <p className="text-text3 text-[14px]">+91 7535663789</p>
                </div>
            </div>

            {/* Details Section */}
            <div className="mt-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 text-[12px]">Driver ID</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">GJ-05-2024-1234567</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 text-[12px]">Licence Number</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">GJ-05-2024-1234567</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 text-[12px]">Manager Name</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">KSHITIJ KAMBLE</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 text-[12px]">Manager Number</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">+91 0000 000 000</p>
                </div>
            </div>
        </div>
    );
};

export default DriverInfo;