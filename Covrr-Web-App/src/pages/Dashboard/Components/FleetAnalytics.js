import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts'; // Import echarts
import { Calendar } from 'primereact/calendar';
import FleetAnalyticsSkeleton from './SkeletonLoader/FleetAnalyticsSkeleton';
import { useTheme } from "../../../context/ThemeContext";

const FleetAnalytics = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [dateRange, setDateRange] = useState(null);
    const [selectedInfo, setSelectedInfo] = useState('fleet_safety');
    const [selectedFleetAnalytics, setSelectedFleetAnalytics] = useState('fleet_report');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const borderColor = isDarkMode ? "#404040" : "#dee5ec"
    const textColor = isDarkMode ? "#98acc3" : '#5b5d6b';
    const CHART_TEXT_STYLE = {
        fontSize: 14,
        color: textColor,
        fontFamily: "'Plus Jakarta Sans', sans-serif"
    };

    const fleetSafetyScoreOptions = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}"
        },
        legend: {
            orient: "vertical",
            right: "2%",
            top: "middle",
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 20,
            textStyle: CHART_TEXT_STYLE,
            formatter: function (name) {
                const data = fleetSafetyScoreOptions.series[0].data;
                const item = data.find(d => d.name === name);
                return `${name}: ${item ? item.value : ''}`;
            }
        },
        graphic: [
            {
                type: 'text',
                left: '75px',
                top: '42%',
                style: {
                    text: '000',
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fill: isDarkMode ? "#ffffff" : '#000000'
                }
            },
            {
                type: 'text',
                left: '65px',
                top: '54%',
                style: {
                    text: 'Safety Score',
                    fontSize: 12,
                    textAlign: 'center',
                    fill: isDarkMode ? "#98acc3" : '#5b5d6b'
                }
            }
        ],
        series: [
            ...[0, 21, 32].map((rotation, index) => ({
                type: "pie",
                radius: [`${45}%`, `${65}%`],
                center: ["98px", "50%"],
                zlevel: index,
                startAngle: rotation,
                label: { show: false },
                labelLine: { show: false },
                itemStyle: {
                    borderRadius: 20,
                    borderWidth: 0,
                },
                emphasis: {
                    scale: false,
                    itemStyle: {
                        borderWidth: 0,
                    }
                },
                data: [
                    { value: 400, name: "Distracted", itemStyle: { color: "#4A83FF" } },
                    { value: 300, name: "Over Speeding", itemStyle: { color: "#32E4E7" } },
                    { value: 200, name: "Harsh Acceleration", itemStyle: { color: "#FCD515" } },
                    { value: 150, name: "Crash detection", itemStyle: { color: "#F83933" } },
                    { value: 100, name: "Harsh Breaking", itemStyle: { color: "#AAF60A" } },
                    { value: 80, name: "Smoking", itemStyle: { color: "#A164FC" } }
                ]
            }))
        ]
    };

    const fleetAnalyticsOptions = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}"
        },
        legend: {
            orient: "vertical",
            right: "1%",
            top: "middle",
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 20,
            textStyle: CHART_TEXT_STYLE,
            formatter: function (name) {
                const data = fleetAnalyticsOptions.series[0].data;
                const item = data.find(d => d.name === name);
                return `${name}: ${item ? item.value : ''}`;
            }
        },
        graphic: [
            {
                type: 'text',
                left: '75px',
                top: '42%',
                style: {
                    text: '000',
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fill: isDarkMode ? "#ffffff" : '#000000'
                }
            },
            {
                type: 'text',
                left: '69px',
                top: '54%',
                style: {
                    text: 'Total Alerts',
                    fontSize: 12,
                    textAlign: 'center',
                    fill: isDarkMode ? "#98acc3" : '#5b5d6b'
                }
            }
        ],
        series: [
            ...[0, 21, 32].map((rotation, index) => ({
                type: "pie",
                radius: [`${45}%`, `${65}%`],
                center: ["98px", "50%"],
                zlevel: index,
                startAngle: rotation,
                label: { show: false },
                labelLine: { show: false },
                itemStyle: {
                    borderRadius: 20,
                    borderWidth: 0,
                },
                emphasis: {
                    scale: false,
                    itemStyle: {
                        borderWidth: 0,
                    }
                },
                data: [
                    { value: 2900, name: "Running", itemStyle: { color: "#AAF60A" } },
                    { value: 2300, name: "Parked", itemStyle: { color: "#FCD515" } },
                    { value: 2300, name: "Inactive", itemStyle: { color: "#FA1F18" } },

                ]
            }))
        ]
    };

    const chargerAnalyticsOptions = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c}"
        },
        legend: {
            orient: "vertical",
            right: "1%",
            top: "middle",
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 20,
            textStyle: CHART_TEXT_STYLE,
            formatter: function (name) {
                const data = chargerAnalyticsOptions.series[0].data;
                const item = data.find(d => d.name === name);
                return `${name}: ${item ? item.value : ''}`;
            }
        },
        graphic: [
            {
                type: 'text',
                left: '75px',
                top: '42%',
                style: {
                    text: '000',
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fill: isDarkMode ? "#ffffff" : '#000000'
                }
            },
            {
                type: 'text',
                left: '69px',
                top: '54%',
                style: {
                    text: 'Total Alerts',
                    fontSize: 12,
                    textAlign: 'center',
                    fill: isDarkMode ? "#98acc3" : '#5b5d6b'
                }
            }
        ],
        series: [
            ...[0, 21, 32].map((rotation, index) => ({
                type: "pie",
                radius: [`${45}%`, `${65}%`],
                center: ["98px", "50%"],
                zlevel: index,
                startAngle: rotation,
                label: { show: false },
                labelLine: { show: false },
                itemStyle: {
                    borderRadius: 20,
                    borderWidth: 0,
                },
                emphasis: {
                    scale: false,
                    itemStyle: {
                        borderWidth: 0,
                    }
                },
                data: [
                    { value: 2900, name: "Plugged in", itemStyle: { color: "#4A83FF" } },
                    { value: 2300, name: "Available", itemStyle: { color: "#AAF60A" } },
                    { value: 2300, name: "Inactive", itemStyle: { color: "#FA1F18" } },

                ]
            }))
        ]
    };

    const areaChartOptions = {
        color: ['#FFCD68', '#AAF60A', '#6BADF2'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            top: '-10px',
            textStyle: CHART_TEXT_STYLE,
            padding: 10,
            itemGap: 50,
            itemWidth: 15, // Set legend symbol width to dot size
            itemHeight: 15, // Set legend symbol height to dot size
            icon: 'circle' // Set legend icon to solid circle
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                fontSize: 12,
                color: "#9496A1", // Use text color variable
                padding: [6, 0, 0, 0],
            },
            axisLine: {
                lineStyle: {
                    color: borderColor,
                },
            },
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            axisLabel: {
                fontSize: 12,
                color: "#9496A1", // Use text color variable
                padding: [10, 0, 0, 0], // Add padding top
            },
            splitLine: {
                lineStyle: {
                    color: borderColor,
                    type: "dotted", // Set split line to dotted
                },
            },
            axisLine: {
                lineStyle: {
                    color: borderColor,
                },
            },
            type: 'value'
        },
        grid: {
            left: '0.2%',
            right: '1%',
            bottom: '10%',
            top: '2%',
            containLabel: true
        },
        series: [
            {
                name: 'Harsh Acceleration',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 1
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255, 205, 104, 0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 205, 104, 0.1)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 701, 934, 890, 730, 1020, 120, 1050, 980, 2000, 1200]
            },
            {
                name: 'Over Speeding',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 1
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(170, 246, 10, 0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(170, 246, 10, 0.1)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [620, 832, 701, 834, 1090, 1030, 1020, 700, 650, 580, 850, 600]
            },
            {
                name: 'Crash detection',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 1
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(107, 173, 242, 0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(107, 173, 242, 0.1)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [420, 632, 501, 634, 890, 1030, 920, 500, 450, 380, 550, 800]
            }
        ]
    };

    if (isLoading) {
        return <FleetAnalyticsSkeleton />;
    }

    return (
        <>

            <div className="grid grid-cols-5 gap-4 mt-6">
                {[
                    { label: "Total Distance", value: "0000000km", icon: require("../../../assets/images/icons/dashboard_distance.png") },
                    { label: "Carbon Savings", value: "994", icon: require("../../../assets/images/icons/dashboard_carbon.png") },
                    { label: "Total Regions", value: "994", icon: require("../../../assets/images/icons/dashboard_region.png") },
                    { label: "Total Depots", value: "994", icon: require("../../../assets/images/icons/dashboard_depots.png") },
                    { label: "Total Drivers", value: "994", icon: require("../../../assets/images/icons/dashboard_driver.png") },
                ].map((item, index) => (
                    <div key={index} className="p-4 border border-border rounded-xl bg-cardBackground flex items-center shadow-[0px_0px_15px_5px_#00000005] space-x-4">
                        <span className="text-2xl bg-muted2 rounded-full h-[46px] w-[46px] flex items-center justify-center">
                            <img src={item.icon} alt="icon" className="w-[26px] h-[26px]" />
                        </span>
                        <div>
                            <div className="text-sm text-text3">{item.label}</div>
                            <div className="text-xl text-text1 font-bold">{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 cursor-pointer">
                <div onClick={() => setSelectedInfo('fleet_safety')} className={`p-6 pb-0 border border-border rounded-xl bg-cardBackground dark:bg-gradient2 cursor-pointer
                    ${selectedInfo === 'fleet_safety' ? 'ring-[1px] shadow-xl ring-primary' : 'ring-0 hover:bg-muted1 hover:border hover:border-primary shadow-[0px_0px_15px_5px_#00000005]'}`}>
                    <h3 className="text-lg text-text1 font-bold mb-[-30px]">Fleet Safety Score</h3>
                    <ReactECharts
                        option={fleetSafetyScoreOptions}
                        className="mb-[-25px] mt-[-10px] cursor-pointer"
                    />
                </div>
                <div onClick={() => setSelectedInfo('fleet_analytics')} className={`p-6 pb-0 border border-border rounded-xl bg-cardBackground dark:bg-gradient2 cursor-pointer
                    ${selectedInfo === 'fleet_analytics' ? 'ring-[1px] shadow-xl ring-primary' : 'ring-0 hover:bg-muted1 hover:border hover:border-primary shadow-[0px_0px_15px_5px_#00000005]'}`}>
                    <h3 className="text-lg font-semibold mb-[-30px]">Fleet Analytics</h3>
                    <ReactECharts
                        option={fleetAnalyticsOptions}
                        className="mb-[-25px] mt-[-10px]"
                    />
                </div>
                <div onClick={() => setSelectedInfo('charger_analytics')} className={`p-6 pb-0 border border-border rounded-xl bg-cardBackground dark:bg-gradient2 cursor-pointer
                    ${selectedInfo === 'charger_analytics' ? 'ring-[1px] shadow-xl ring-primary' : 'ring-0 hover:bg-muted1 hover:border hover:border-primary shadow-[0px_0px_15px_5px_#00000005]'}`}>
                    <h3 className="text-lg font-semibold mb-[-30px]">Chargers Analytics</h3>
                    <ReactECharts
                        option={chargerAnalyticsOptions}
                        className="mb-[-25px] mt-[-10px] cursor-pointer"
                    />
                </div>
            </div>
            {
                selectedInfo === 'fleet_safety' && (
                    <>
                        <div key="fleet_safety" className="animate-fadeIn p-6 pt-4 pb-0 border border-border rounded-xl bg-cardBackground shadow-[0px_0px_15px_5px_#00000005] mt-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg text-text1 font-bold">Fleet Safety Score</h3>
                                <div className="flex items-center space-x-2 border border-border rounded-md">
                                    <Calendar
                                        value={dateRange}
                                        onChange={(e) => setDateRange(e.value)}
                                        selectionMode="range"
                                        readOnlyInput
                                        placeholder="Select Date Range"
                                        inputClassName="!border-[0px] !ring-0"
                                        showIcon
                                    />
                                </div>
                            </div>

                            <ReactECharts option={areaChartOptions} className="mt-6 w-full" />
                        </div>
                    </>
                ) ||
                selectedInfo === 'fleet_analytics' && (
                    <>
                        <div key="fleet_analytics" className="animate-fadeIn p-6 pt-4 pb-0 border border-border rounded-xl bg-cardBackground shadow-[0px_0px_15px_5px_#00000005] mt-6">
                            <div className="flex justify-between items-center">

                                <div className="flex items-center border border-border rounded-md p-[2px] bg-muted1 mb-2 relative">
                                    <div
                                        className={`absolute top-0 left-0 h-full w-1/2 bg-cardBackground shadow-sm border border-border rounded-md transition-transform duration-300 ease-in-out my-[0.5px] ${selectedFleetAnalytics === 'fleet_report' ? 'transform translate-x-0' : 'transform translate-x-full'}`}
                                    ></div>
                                    <button className={`w-[200px] whitespace-nowrap py-2 rounded-lg text-text1 text-[14px] relative z-10 ${selectedFleetAnalytics === 'fleet_report' ? 'font-semibold' : ''}`} onClick={() => setSelectedFleetAnalytics('fleet_report')}>
                                        Fleet Utilization reports
                                    </button>
                                    <button className={`w-[200px] whitespace-nowrap py-2 rounded-lg text-text1 text-[14px] relative z-10 ${selectedFleetAnalytics === 'cost_analytics' ? 'font-semibold' : ''}`} onClick={() => setSelectedFleetAnalytics('cost_analytics')}>
                                        Cost Analysis
                                    </button>
                                </div>
                            </div>
                            {
                                selectedFleetAnalytics === 'fleet_report' && (
                                    <ReactECharts option={areaChartOptions} className="mt-6 w-full" />
                                ) ||
                                selectedFleetAnalytics === 'cost_analytics' && (
                                    <ReactECharts option={areaChartOptions} className="mt-6 w-full" />
                                )
                            }
                        </div>
                    </>
                ) ||
                selectedInfo === 'charger_analytics' && (
                    <>
                        <div key="charger_analytics" className="animate-fadeIn p-6 pt-4 pb-0 border border-border rounded-xl bg-cardBackground shadow-[0px_0px_15px_5px_#00000005] mt-6">
                            <div className="flex justify-between items-center">

                                <div className="flex items-center border border-border rounded-md p-[2px] bg-muted1 mb-2 relative">
                                    <div
                                        className={`absolute top-0 left-0 h-full w-1/2 bg-cardBackground shadow-sm border border-border rounded-md transition-transform duration-300 ease-in-out my-[0.5px] ${selectedFleetAnalytics === 'fleet_report' ? 'transform translate-x-0' : 'transform translate-x-full'}`}
                                    ></div>
                                    <button className={`w-[200px] whitespace-nowrap py-2 rounded-lg text-text1 text-[14px] relative z-10 ${selectedFleetAnalytics === 'fleet_report' ? 'font-semibold' : ''}`} onClick={() => setSelectedFleetAnalytics('fleet_report')}>
                                        Fleet Utilization reports
                                    </button>
                                    <button className={`w-[200px] whitespace-nowrap py-2 rounded-lg text-text1 text-[14px] relative z-10 ${selectedFleetAnalytics === 'cost_analytics' ? 'font-semibold' : ''}`} onClick={() => setSelectedFleetAnalytics('cost_analytics')}>
                                        Cost Analysis
                                    </button>
                                </div>
                            </div>
                            {
                                selectedFleetAnalytics === 'fleet_report' && (
                                    <ReactECharts option={areaChartOptions} className="mt-6 w-full" />
                                ) ||
                                selectedFleetAnalytics === 'cost_analytics' && (
                                    <ReactECharts option={areaChartOptions} className="mt-6 w-full" />
                                )
                            }
                        </div>
                    </>
                )
            }

        </>
    );
};

export default FleetAnalytics;
