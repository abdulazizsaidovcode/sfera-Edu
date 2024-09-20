import React, { useState } from "react";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);

  const handlePlayClick = () => {
    setIsReadyToPlay(true); // Set to true after user interaction
  };

  return (
    <div className="video-container w-full h-auto">
      {isReadyToPlay ? (
        // Embed the YouTube video with iframe after user clicks Play
        <iframe
          width="100%" // Full width for responsive design
          height="500" // Adjust height as needed
          src={`https://www.youtube.com/embed/KQDTtvZMS9c?si=F8b6FjgAcAwSz3DP`} // autoplay=1 to start playing after clicking play
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        // Display the play button until user clicks it
        <button onClick={handlePlayClick} className="play-button">
          Play Video
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;



// import React from "react";

// interface VideoPlayerProps {
//   videoId: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
//   return (
//     <div className="w-full h-auto">
//       <iframe
//         width="100%"
//         height="480"
//         src={`https://www.youtube.com/embed/KQDTtvZMS9c?si=F8b6FjgAcAwSz3DP`}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </div>
//   );
// };

// export default VideoPlayer;
// import React from "react";
// import ReactPlayer from "react-player";

// interface VideoPlayerProps {
//   videoId: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
//   return (
//     <div className="w-full h-auto">
//       <ReactPlayer
//         url={`https://www.youtube.com/watch?v=KQDTtvZMS9c?si=F8b6FjgAcAwSz3DP`}
//         controls={true}
//         width="100%"
//         height="480px"
//         config={{
//           youtube: {
//             playerVars: { showinfo: 1, modestbranding: 1 }, // YouTube playerini minimum elementlar bilan ko'rsatish
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default VideoPlayer;

// import React, { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-youtube"; // YouTube qo'llab-quvvatlashini o'rnatamiz

// interface VideoPlayerProps {
//   videoId: string;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const playerRef = useRef<any>(null);

//   console.log(videoId);
//   useEffect(() => {
//     const videoElement = videoRef.current;
//     console.log('render');
    

//     if (videoElement && document.contains(videoElement)) {
//       console.log('0o');

//       if (!playerRef.current) {
//         console.log(playerRef.current, 'v1 video');

//         // Video.js pleerni yaratamiz
//         playerRef.current = videojs(videoElement, {
//           techOrder: ["youtube"],
//           sources: [
//             {
//               src: `https://www.youtube.com/watch?v=KQDTtvZMS9c?si=F8b6FjgAcAwSz3DP}`,
//               type: "video/youtube",
//             },
//           ],
//           youtube: {
//             modestbranding: 1,
//             controls: 1,
//             rel: 0,
//           },
//         });
//       } else {
//         console.log(playerRef.current, 'v2 video');

//         // Avval pleerni reset qilamiz, so'ngra yangi videoni yuklaymiz
//         playerRef.current.src([
//           {
//             src: `https://www.youtube.com/embed/zKmRwUB3rFQ`,
//             type: "video/youtube",
//           },
//         ]);
//         playerRef.current.load(); // Yangi videoni yuklaymiz
//       }
//     }

//     // Tozalash funksiyasi
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [videoId]);

//   return (
//     <div data-vjs-player>
//       <video
//         ref={videoRef}
//         className="video-js vjs-default-skin w-full h-90"
//         controls
//       ></video>
//     </div>
//   );
// };

// export default VideoPlayer;
