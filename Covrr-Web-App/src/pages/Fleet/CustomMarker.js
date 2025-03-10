import React, { useEffect, useRef } from "react";
import { OverlayView } from "@react-google-maps/api";

const CustomMarker = ({ position, rotation, icon }) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      const markerElement = markerRef.current;
      markerElement.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`; // Adjust anchor position
    }
  }, [rotation]);

  return (
    <OverlayView position={position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <div
        ref={markerRef}
        style={{
          position: "absolute",
          transformOrigin: "center",
          width: icon.scaledSize?.width,
          height: icon.scaledSize?.height,
          backgroundImage: `url(${icon.url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </OverlayView>
  );
};

export default CustomMarker;
