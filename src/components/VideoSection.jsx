import React from "react";
import videoFile from "../assets/Car_Modification_Video_and_Math_Problem (1).mp4";

const VideoSection = () => {
  return (
    <div className="w-full flex justify-center bg-black py-4">
      <video
        src={videoFile}
        controls
        className="w-full max-w-4xl rounded-lg shadow-lg"
      />
    </div>
  );
};

export default VideoSection;
