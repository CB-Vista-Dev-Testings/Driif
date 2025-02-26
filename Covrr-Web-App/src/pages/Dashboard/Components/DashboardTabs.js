import React from 'react';

const DashboardTabs = ({ selectedInfo, setSelectedInfo }) => {
    return (
        <div className="flex flex-row gap-x-2">
            <button
                className={`px-6 rounded-full py-2 text-[15px] ${selectedInfo === 'fleet' ? 'bg-primary shadow-xl font-semibold text-white dark:text-black' : 'shadow-sm bg-muted1 border border-border hover:ring-[1px] hover:ring-primary'
                    }`}
                onClick={() => setSelectedInfo('fleet')}
            >
                Fleet Analytics
            </button>
            <button
                className={`px-6 rounded-full py-2 text-[15px] ${selectedInfo === 'service' ? 'bg-primary shadow-xl font-semibold text-white dark:text-black' : 'shadow-sm bg-muted1 border border-border hover:ring-[1px] hover:ring-primary'
                    }`}
                onClick={() => setSelectedInfo('service')}
            >
                Service Analytics
            </button>
            <button
                className={`px-6 rounded-full py-2 text-[15px] ${selectedInfo === 'accounting' ? 'bg-primary shadow-xl font-semibold text-white dark:text-black' : 'shadow-sm bg-muted1 border border-border hover:ring-[1px] hover:ring-primary'
                    }`}
                onClick={() => setSelectedInfo('accounting')}
            >
                Accounting
            </button>
            <button
                className={`px-6 rounded-full py-2 text-[15px] ${selectedInfo === 'insurance' ? 'bg-primary shadow-xl font-semibold text-white dark:text-black' : 'shadow-sm bg-muted1 border border-border hover:ring-[1px] hover:ring-primary'
                    }`}
                onClick={() => setSelectedInfo('insurance')}
            >
                Insurance
            </button>
        </div>
    );
};

export default DashboardTabs;
