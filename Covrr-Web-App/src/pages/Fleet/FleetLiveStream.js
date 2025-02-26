import React, { useEffect, useRef, useState } from 'react'; // Import useState
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { XCircleIcon } from '@heroicons/react/24/solid';

const LiveStreamPlayer = ({ width = '100%', height = '100%', onClose }) => { // Add onClose prop
    const videoRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (videoRef.current) {
                const player = videojs(videoRef.current, {
                    autoplay: true,
                    controls: true,
                    liveui: true,
                    sources: [{
                        src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // Updated live stream URL
                        type: 'application/x-mpegURL',
                    }],
                });

                // Cleanup player when component unmounts
                return () => {
                    player.dispose();
                };
            }
        }, 100); // Delay initialization by 100ms

        return () => clearTimeout(timeoutId); // Clear timeout if component unmounts
    }, []);

    return (
        <div className='flex flex-col w-full items-center'>
            <XCircleIcon
                className="h-9 w-9 text-white/85 mb-4 cursor-pointer justify-end items-end ml-auto me-[7%]"
                onClick={() => {
                    onClose();
                }} // Handle click to hide player
            /> {/* Close button */}
            <div data-vjs-player className="relative" style={{ width, height }}> {/* Apply width and height */}
                <video ref={videoRef} className="video-js vjs-default-skin w-full h-full" /> {/* Apply width and height */}
                <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded font-bold z-10">
                    LIVE
                </div>
            </div>
        </div>
    );
};

export default LiveStreamPlayer;
