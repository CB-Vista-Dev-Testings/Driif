import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import DriverInfo from "./DriverInfo";
import TripHistory from "./TripHistory";
import FleetInfo from "./FleetInfo";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Calendar } from 'primereact/calendar';

const FleetInfoMain = ({ onTripReplay }) => {
    const [activeTab, setActiveTab] = useState("driver");
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <>
            <div className="relative w-full mt-10 shadow-2xl rounded-b-lg border border-border2">
                {/* Tabs */}
                <button
                    className="absolute top-[-30px] !min-w-[20px] !p-[6px_10px_25px_10px] right-0 border border-border2 font-semibold btn bg-cardBackground shadow-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronUpIcon size={24} className='size-4' /> : <ChevronDownIcon size={24} className='size-5 text-primary' />}
                </button>
                <div className="relative flex border-b border-border bg-cardBackground rounded-t-lg">
                    {activeTab === "trip" ? (
                        <div className='absolute top-3 right-3'>
                            <button className='btn bg-primary/15 border border-primary !px-1 !py-1' onClick={() => setShowDatePicker(!showDatePicker)}>
                                <CalendarIcon className='size-4 text-primary' />
                            </button>
                            {showDatePicker && (
                                <div style={{ position: 'absolute', zIndex: 1000, bottom: '40px', right: '0' }}>
                                    <Calendar
                                        value={dateRange}
                                        onChange={(e) => {
                                            setDateRange(e.value);
                                            // setShowDatePicker(false);
                                        }}
                                        selectionMode="range"
                                        inline
                                        appendTo={document.body}
                                    />
                                </div>
                            )}
                        </div>
                    ) : null}
                    <button
                        className={`flex-1 p-3 text-center font-semibold border-b-1 ${activeTab === "driver" ? "border-b-2 text-primary border-primary" : "text-text3"}`}
                        onClick={() => setActiveTab("driver")}
                    >
                        Driver details
                    </button>
                    <button
                        className={`flex-1 p-3 text-center font-semibold border-b-1 ${activeTab === "vehicle" ? "border-b-2 text-primary border-primary" : "text-text3"}`}
                        onClick={() => setActiveTab("vehicle")}
                    >
                        Vehicle details
                    </button>
                    <button
                        className={`flex-1 p-3 text-center font-semibold border-b-1 ${activeTab === "trip" ? "border-b-2 text-primary border-primary" : "text-text3"}`}
                        onClick={() => setActiveTab("trip")}
                    >
                        Trip history
                    </button>
                </div>

                {/* Expandable Section */}
                <div
                    className={`overflow-hidden relative bg-cardBackground rounded-b-lg p-4 transition-all duration-300 dark:bg-gradient1 ${isOpen ? 'max-h-screen opacity-100 block' : 'max-h-0 opacity-0 hidden'}`}
                >
                    {activeTab === "driver" && <DriverInfo />}
                    {activeTab === "vehicle" && <FleetInfo />}
                    {activeTab === "trip" && <TripHistory onTripReplay={onTripReplay} />}
                </div>

                {/* Toggle Button */}

            </div>
        </>
    );
};

export default FleetInfoMain;
