import { useState, useEffect } from 'react';

export const useVehicleIcon = (isLoaded) => {
    const [vehicleIcon, setVehicleIcon] = useState(null);

    useEffect(() => {
        if (isLoaded && window.google) {
            setVehicleIcon({
                url: "https://png.pngtree.com/png-clipart/20230408/ourmid/pngtree-car-top-view-sports-car-transport-png-image_6679318.png",
                scaledSize: new window.google.maps.Size(40, 30),
                anchor: new window.google.maps.Point(15, 15),
                rotation: 0,
                // Point the vehicle icon upward by default
                origin: new window.google.maps.Point(0, 0)
            });
        }
    }, [isLoaded]);

    return vehicleIcon;
};
