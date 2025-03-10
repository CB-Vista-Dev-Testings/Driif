import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const VideoPlayer = ({ url, title, isFocused }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (videoRef.current) {
        const player = videojs(videoRef.current, {
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          width: 200,
          height: 120,
          sources: [
            {
              src: url,
              type: "video/mp4",
            },
          ],
        });

        // Add custom play button after player initialization
        const playButton = player.bigPlayButton.el_;
        const customPlayIcon = document.createElement("div");
        customPlayIcon.className = "flex justify-center";
        customPlayIcon.innerHTML = `
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.32" fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="white" />
                        <path d="M9.5 13.3915V10.6085C9.5 9.43076 9.5 8.84189 9.7465 8.51C9.96136 8.2207 10.2906 8.03821 10.6498 8.00933C11.0619 7.9762 11.5613 8.2883 12.56 8.9125L14.7864 10.304C15.6862 10.8664 16.1362 11.1476 16.2904 11.5076C16.4252 11.822 16.4252 12.178 16.2904 12.4924C16.1362 12.8524 15.6862 13.1336 14.7864 13.696L12.56 15.0875C11.5613 15.7117 11.0619 16.0238 10.6498 15.9907C10.2906 15.9618 9.96136 15.7793 9.7465 15.49C9.5 15.1581 9.5 14.5692 9.5 13.3915Z" fill="white" />
                    </svg>
                `;
        playButton.appendChild(customPlayIcon);

        // Cleanup player when component unmounts
        return () => {
          player.dispose();
        };
      }
    }, 100); // Delay initialization by 100ms

    return () => clearTimeout(timeoutId); // Clear timeout if component unmounts
  }, [url]);

  return (
    <div
      className={`min-w-[200px] rounded-[10px] overflow-hidden pb-4 transform transition-transform duration-300 hover:scale-110 ${
        isFocused ? "scale-110 ring-4 ring-primary/50 mx-2 transition-all" : "ring-trasnparent scale-100 mx-0 border-transparent rounded-none"
      }`}
    >
      <div data-vjs-player>
        <video ref={videoRef} className={`video-js vjs-default-skin vjs-big-play-centered !h-[115%]`} />
      </div>
    </div>
  );
};

const FleetVideos = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const [focusedVideoId, setFocusedVideoId] = useState(null);
  const fleetVideos = [
    { id: 3, title: "Safety Guidelines", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { id: 4, title: "Driver Instructions", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { id: 5, title: "Fleet Overview", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { id: 6, title: "Emergency Procedures", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { id: 1, title: "Fleet Training Video", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: 2, title: "Vehicle Maintenance", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { id: 7, title: "Fuel Efficiency Tips", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { id: 8, title: "Route Optimization", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { id: 9, title: "Vehicle Inspection", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" },
    { id: 10, title: "Fleet Management Best Practices", url: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
  ];

  useImperativeHandle(ref, () => ({
    scrollToVideo: (videoId) => {
      setFocusedVideoId(videoId);
      const videoIndex = fleetVideos.findIndex((video) => video.id === videoId);
      if (videoIndex !== -1 && containerRef.current) {
        const videoElement = containerRef.current.children[videoIndex];
        if (videoElement) {
          videoElement.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
      }
    },
    clearFocus: () => {
      setFocusedVideoId(null);
    },
  }));

  const handleWheel = (e) => {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 280; // Approximate width of video + gap
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 280; // Approximate width of video + gap
    }
  };

  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center top-1/2 -left-4 bg-themeWhite  transform -translate-y-1/2 rounded-full w-[35px] h-[35px] border border-border2 shadow-xl z-10">
        <ChevronLeftIcon onClick={scrollLeft} className="w-6 h-4 text-themeBlack cursor-pointer z-10 hover:opacity-80" />
      </div>
      <div className="absolute flex items-center justify-center top-1/2 -right-4 bg-themeWhite  transform -translate-y-1/2 rounded-full w-[35px] h-[35px] border border-border2 shadow-xl z-10">
        <ChevronRightIcon onClick={scrollRight} className="w-6 h-4 text-themeBlack cursor-pointer z-10 hover:opacity-80" />
      </div>
      <div ref={containerRef} className="flex flex-row overflow-x-auto theme-scrollbar gap-x-3 p-4 px-0 relative overflow-y-hidden scroll-smooth" onWheel={handleWheel}>
        {fleetVideos.map((video) => (
          <VideoPlayer key={video.id} url={video.url} title={video.title} isFocused={video.id === focusedVideoId} />
        ))}
      </div>
    </div>
  );
});

export default FleetVideos;
