import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
 

  return (
    <div data-vjs-player>
      <video
        id="my-video"
        className="video-js w-full h-auto" 
        controls
        preload="auto"
        loop={false}
       
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
        autoPlay={false}
      >
        {/* <source src="MY_VIDEO.mp4" type="video/mp4" /> */}
        <source src={`${videoId}`} type="video/youtube" />
      </video>
    </div>
  );
};

export default VideoPlayer;
