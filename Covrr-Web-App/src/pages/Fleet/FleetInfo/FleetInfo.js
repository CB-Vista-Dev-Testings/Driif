import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const FleetInfo = () => {
    return (
        <div className="p-1 bg-cardBackground rounded-lg">
            {/* Driver Info */}
            <div className='flex items-center justify-between'>
                <div className="flex items-center gap-4">
                    <img
                        src={require("../../../assets/images/icons/fleet_lcon.svg").default}
                        alt="Driver"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h2 className="text-[16px] font-semibold text-text2">GJ 00 CH 0000</h2>
                        <p className="text-text3 text-[14px]">GJ 05 2024 1234567</p>
                    </div>
                </div>
                <img src={require("../../../assets/images/icons/camera.svg").default} alt="Vehicle" className="w-12" />
            </div>

            {/* Details Section */}
            <p className='mt-6 text-[12px] text-text3'>VEHICLE DETAILS</p>
            <div className="mt-2 grid grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 pb-2 text-[12px]">Driver ID</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">GJ-05-2024-1234567</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 pb-2 text-[12px]">Licence Number</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">GJ-05-2024-1234567</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 pb-2 text-[12px]">Manager Name</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">KSHITIJ KAMBLE</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 pb-2 text-[12px]">Manager Number</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">+91 0000 000 000</p>
                </div>
            </div>
            <p className='mt-6 text-[12px] text-text3'>INSURANCE DETAILS</p>
            <div className="mt-2 grid grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-muted1 p-3 rounded-lg relative">
                    <CheckCircleIcon className='text-green-500 size-5 absolute right-4' />
                    <p className="text-text5 pb-2 text-[12px]">Insurance Status</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">01/04/24 - 01/04/25</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg">
                    <p className="text-text5 pb-2 text-[12px]">Insured Value</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">₹ 14,000</p>
                </div>
                <div className="bg-muted1 p-3 rounded-lg relative">
                    <InformationCircleIcon className='text-text4 size-5 absolute right-4' />
                    <p className="text-text5 pb-2 text-[12px]">IDV</p>
                    <p className="text-text2 text-[14px] whitespace-nowrap font-medium">₹ 25,00,000</p>
                </div>

            </div>
        </div>
    );
};

export default FleetInfo;