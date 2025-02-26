import React, { useState, useEffect } from 'react';
import { FilterIcon, SidebarVehicles, WarningIcon } from '../../../components/SvgIcons';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { vehiclesDashboardData, chargerDashboardData } from '../../../data/sampleData';
import AppBadge from '../../../components/common/AppBadges';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ServiceAnalyticsSkeleton from './SkeletonLoader/ServiceAnalyticsSkeleton';

const ServiceAnalytics = () => {

    const [selectedInfo, setSelectedInfo] = useState('fleet');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <ServiceAnalyticsSkeleton />;
    }

    const actionTemplate = (rowData) => (
        <AppBadge
            text={rowData.status}
            color={
                rowData.status === "Running" ? "green" :
                    rowData.status === "Idling" ? "yellow" :
                        rowData.status === "Parked" ? "red" : "gray"
            }
            className="!rounded-full"
        />
    );

    const actionTemplateCharger = (rowData) => (
        <AppBadge
            text={rowData.status}
            color={
                rowData.status === "Available" ? "green" :
                    rowData.status === "Plugged" ? "yellow" :
                        rowData.status === "Inactive" ? "red" : "gray"
            }
            className="!rounded-full"
        />
    );

    return (
        <div>
            <div className="flex flex-row gap-x-2 bg-cardBackground p-4 px-4 mr-[-15px] ml-[-15px] ">
                <button className={`px-12 rounded-full py-2 text-[15px] ${selectedInfo === 'fleet' ? 'bg-primary shadow-xl font-semibold text-white dark:text-black' : 'shadow-sm bg-muted1 border border-border hover:ring-[1px] hover:ring-primary'}`}
                    onClick={() => setSelectedInfo('fleet')}>
                    Fleet
                </button>
                <button className={`px-12 rounded-full py-2 text-[15px] ${selectedInfo === 'charger' ? 'bg-primary shadow-xl font-semibold text-white dark:text-black' : 'shadow-sm bg-muted1 border border-border hover:ring-[1px] hover:ring-primary'}`}
                    onClick={() => setSelectedInfo('charger')}>
                    Charger
                </button>

            </div>
            {
                selectedInfo === 'fleet' && (
                    <div className='animate-fadeIn' key="fleet">
                        <div className='flex flex-row gap-x-2 mt-5'>
                            <div className='w-full bg-[#AAF60A33] px-2 py-2 font-semibold rounded-full flex items-center text-text2 gap-x-2'>
                                <span className='flex bg-[#AAF60A] rounded-full w-[40px] h-[40px] items-center justify-center'>
                                    <SidebarVehicles className="fill-none text-black" /></span>200
                            </div>
                            <div className='w-full bg-[#FCD51533] px-2 py-2 font-semibold rounded-full flex items-center text-text2 gap-x-2'>
                                <span className='flex bg-[#FCD515] rounded-full w-[40px] h-[40px] items-center justify-center'>
                                    <SidebarVehicles className="fill-none text-black" /></span>100
                            </div>
                            <div className='w-full bg-[#FA1F1833] px-2 py-2 font-semibold rounded-full flex items-center text-text2 gap-x-2'>
                                <span className='flex bg-[#FA1F18] rounded-full w-[40px] h-[40px] items-center justify-center'>
                                    <SidebarVehicles className="fill-none text-white" /></span>150
                            </div>
                        </div>
                        <div className='grid grid-cols-6 gap-x-4 mt-4'>
                            <div className='col-span-4 bg-cardBackground rounded-lg shadow-sm px-4 py-2'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-text1 font-semibold text-[16px]'>Vehicle</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="searchInputField w-full">
                                            <input name="search" type="text" placeholder="Search" />
                                            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
                                        </div>
                                        <button className="btn btn-icon border border-border2 text-center !pt-[11px] !pb-[7px] !px-3 bg-cardBackground !shadow-none">
                                            <FilterIcon className="h-10 w-10 mt-1 text-text2" />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-cardBackground rounded-lg">

                                    <DataTable value={vehiclesDashboardData} className="w-full mt</DataTable>-4">
                                        <Column field="number" header="Vehicle Number" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column field="id" header="Vehicle ID" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column field="vin_number" header="VIN Number" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column body={actionTemplate} header="Status" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column field="fault_code" header="Fault Code" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                    </DataTable>
                                </div>
                            </div>
                            <div className='col-span-2 bg-cardBackground rounded-lg shadow-sm px-4 py-2'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-text1 font-semibold text-[16px]'>Details</p>
                                    <div className="flex items-center gap-2 mt-4 invisible">
                                        <div className="searchInputField w-full">
                                            <input name="search" type="text" placeholder="Search" />
                                            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
                                        </div>
                                        <button className="btn btn-icon border border-border2 text-center !pt-[11px] !pb-[7px] !px-3 bg-cardBackground !shadow-none">
                                            <FilterIcon className="h-10 w-10 mt-1 text-text2" />
                                        </button>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='bg-themeYellow/10 rounded-lg col-span-2 px-4 py-4'>
                                        <p className='text-themeYellow text-sm'>Fault code Description</p>
                                        <p className='text-[14px] font-semibold pt-1'> 001A_GPS Error</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Driver name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Milan Kodavala</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Driver number</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">+91 9904703101</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Manager Name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Suresh Kumar</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Manager Number</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">+91 0000 000 000</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">region name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Gujarat</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">depot name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Ranip Ahemdabad</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Vehicle ID</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">GJ-05-2024-1234567</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">vehicle Model</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">GJ-05-2024-1234567</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Charging percentage</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">00%</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Charge cycles</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">000</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Insurance Status</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">01/04/24 - 01/04/25</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                || selectedInfo === 'charger' && (
                    <div className='animate-fadeIn' key="charger">
                        <div className='flex flex-row gap-x-2 mt-5'>
                            <div className='w-full bg-[#AAF60A33] px-2 py-2 font-semibold rounded-full flex items-center text-text2 gap-x-2'>
                                <span className='flex bg-[#AAF60A] rounded-full w-[40px] h-[40px] items-center justify-center'>
                                    <SidebarVehicles className="fill-none text-black" /></span>400
                            </div>
                            <div className='w-full bg-[#FCD51533] px-2 py-2 font-semibold rounded-full flex items-center text-text2 gap-x-2'>
                                <span className='flex bg-[#FCD515] rounded-full w-[40px] h-[40px] items-center justify-center'>
                                    <SidebarVehicles className="fill-none text-black" /></span>500
                            </div>
                            <div className='w-full bg-[#FA1F1833] px-2 py-2 font-semibold rounded-full flex items-center text-text2 gap-x-2'>
                                <span className='flex bg-[#FA1F18] rounded-full w-[40px] h-[40px] items-center justify-center'>
                                    <SidebarVehicles className="fill-none text-white" /></span>350
                            </div>
                        </div>
                        <div className='grid grid-cols-6 gap-x-4 mt-6'>
                            <div className='col-span-4 bg-cardBackground rounded-lg shadow-sm px-4 py-4'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-text1 font-semibold text-[16px]'>Vehicle</p>
                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="searchInputField w-full">
                                            <input name="search" type="text" placeholder="Search" />
                                            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
                                        </div>
                                        <button className="btn btn-icon border border-border2 text-center !pt-[11px] !pb-[7px] !px-3 bg-cardBackground !shadow-none">
                                            <FilterIcon className="h-10 w-10 mt-1 text-text2" />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-cardBackground rounded-lg">
                                    <DataTable value={chargerDashboardData} className="w-full mt-4">
                                        <Column field="charger_id" header="Charger ID" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column field="rating" header="Rating (KwH)" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column body={actionTemplateCharger} header="Status" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                        <Column field="fault_code" header="Fault Code" headerClassName="py-3 text-[13px] bg-cardBackground text-text5 font-medium" className="text-text3 py-3 border-b border-border text-sm" />
                                    </DataTable>
                                </div>
                            </div>
                            <div className='col-span-2 bg-cardBackground rounded-lg shadow-sm px-4 py-4'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-text1 font-semibold text-[16px]'>Details</p>
                                    <div className="flex items-center gap-2 mt-4 invisible">
                                        <div className="searchInputField w-full">
                                            <input name="search" type="text" placeholder="Search" />
                                            <MagnifyingGlassIcon aria-hidden="true" className="icon" />
                                        </div>
                                        <button className="btn btn-icon border border-border2 text-center !pt-[11px] !pb-[7px] !px-3 bg-cardBackground !shadow-none">
                                            <FilterIcon className="h-10 w-10 mt-1 text-text2" />
                                        </button>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mt-4'>
                                    <div className='bg-themeYellow/10 rounded-lg col-span-2 px-4 py-4'>
                                        <p className='text-themeYellow text-sm'>Fault code Description</p>
                                        <p className='text-[14px] font-semibold pt-1'> 001B_Charger Networking</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Region name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Gujarat</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Depot name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Ranip Ahemdabad</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Manager Name</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">Suresh Kumar</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Manager Number</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">+91 0000 000 000</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Charge cycles</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">000</p>
                                    </div>
                                    <div className="bg-muted1 p-3 rounded-lg">
                                        <p className="text-text5 text-[12px] pb-2">Energy Consumed</p>
                                        <p className="text-text2 text-[14px] whitespace-nowrap font-semibold">00%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ServiceAnalytics;