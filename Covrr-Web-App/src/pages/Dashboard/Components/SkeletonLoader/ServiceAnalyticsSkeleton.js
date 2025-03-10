import React from 'react';
import SkeletonLoader from '../../../../components/common/TableSkeletonLoader';

const ServiceAnalyticsSkeleton = () => {
    return (
        <div>
            {/* Tab buttons skeleton */}
            <div className="flex flex-row gap-x-2 bg-cardBackground p-4 px-4 mr-[-15px] ml-[-15px]">
                <div className="w-32 h-10 bg-muted2 rounded-full animate-pulse"></div>
                <div className="w-32 h-10 bg-muted2 rounded-full animate-pulse"></div>
            </div>

            {/* Stats cards skeleton */}
            <div className="flex flex-row gap-x-2 mt-5">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="w-full h-12 bg-muted2 rounded-full animate-pulse"></div>
                ))}
            </div>

            {/* Main content grid skeleton */}
            <div className="grid grid-cols-6 gap-x-4 mt-6">
                {/* Left panel skeleton */}
                <div className="col-span-4 bg-cardBackground rounded-lg shadow-sm px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-6 w-24 bg-muted2 rounded animate-pulse"></div>
                        <div className="flex gap-2">
                            <div className="w-48 h-10 bg-muted2 rounded animate-pulse"></div>
                            <div className="w-12 h-10 bg-muted2 rounded animate-pulse"></div>
                        </div>
                    </div>
                    {/* Table skeleton */}
                    <SkeletonLoader rows={10} columns={3} />
                </div>

                {/* Right panel skeleton */}
                <div className="col-span-2 bg-cardBackground rounded-lg shadow-sm px-4 py-4">
                    <div className="h-6 w-24 bg-muted2 rounded animate-pulse mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 h-20 bg-muted2 rounded animate-pulse"></div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                            <div key={item} className="h-16 bg-muted2 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceAnalyticsSkeleton;
