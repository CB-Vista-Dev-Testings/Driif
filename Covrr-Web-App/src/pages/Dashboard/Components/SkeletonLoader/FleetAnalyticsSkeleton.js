import React from 'react';

const FleetAnalyticsSkeleton = () => {
    return (
        <>
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-5 gap-4 mt-6">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="p-4 border border-border rounded-xl bg-cardBackground flex items-center space-x-4 animate-pulse">
                        <div className="bg-muted2 rounded-full h-[46px] w-[46px]"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-muted2 rounded w-20 mb-2"></div>
                            <div className="h-6 bg-muted2 rounded w-24"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="p-6 pb-0 border border-border rounded-xl bg-cardBackground animate-pulse">
                        <div className="h-5 bg-muted2 rounded w-40 mb-4"></div>
                        <div className="h-[200px] bg-muted2 rounded mb-4"></div>
                    </div>
                ))}
            </div>

            {/* Bottom Chart Skeleton */}
            <div className="p-6 pb-0 border border-border rounded-xl bg-cardBackground mt-6 animate-pulse">
                <div className="flex justify-between items-center mb-4">
                    <div className="h-5 bg-muted2 rounded w-40"></div>
                    <div className="h-10 bg-muted2 rounded w-48"></div>
                </div>
                <div className="h-[300px] bg-muted2 rounded"></div>
            </div>
        </>
    );
};

export default FleetAnalyticsSkeleton;
