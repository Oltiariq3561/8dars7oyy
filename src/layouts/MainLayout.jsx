import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause, nextTrack, previousTrack, setCurrentTime, setDuration } from "../Redux/audioSlice";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const { isPlaying, selectedTrack, currentTime, duration } = useSelector((state) => state.audio);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handlePrevious = () => {
    dispatch(previousTrack());
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = selectedTrack?.preview_url; 
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, selectedTrack]);

  useEffect(() => {
    const updateTime = () => {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    };

    const updateDuration = () => {
      dispatch(setDuration(audioRef.current.duration));
    };

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="left-bar w-[20vw] h-[100vh] bg-[#020202] text-white fixed left-0 top-0">
        <LeftBar />
      </div>

      <div className="w-[60vw] mx-auto ml-[20vw] mr-[20vw]">
        {children}
      </div>

      <div className="right-bar w-[20vw] h-[100vh] bg-[#020202] text-white fixed right-0 top-0">
        <RightBar />
      </div>

      {selectedTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#181818] text-white px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <div className="flex items-center gap-2">
            <p className="text-md font-semibold">{selectedTrack.name}</p>
            <p className="text-sm text-gray-400">{selectedTrack.artists.map((artist) => artist.name).join(", ")}</p>
            <FavoriteIcon fontSize="small" className="text-green-500" />
          </div>

          <div className="flex items-center gap-4">
            <ShuffleIcon className="text-gray-400 hover:text-white" />
            <SkipPreviousIcon onClick={handlePrevious} className="text-gray-400 hover:text-white" />
            <button onClick={handlePlayPause} className="text-white p-2 rounded-full bg-gray-700">
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <SkipNextIcon onClick={handleNext} className="text-gray-400 hover:text-white" />
            <RepeatIcon className="text-gray-400 hover:text-white" />
          </div>

          <div className="flex items-center gap-2 w-1/3">
            <span className="text-xs text-gray-400">{currentTime.toFixed(2)}</span>
            <div className="flex-grow h-1 bg-gray-600 rounded overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <span className="text-xs text-gray-400">{duration ? duration.toFixed(2) : "0:00"}</span>
          </div>

          <div className="flex items-center gap-2">
            <QueueMusicIcon className="text-gray-400 hover:text-white" />
            <VolumeUpIcon className="text-gray-400 hover:text-white" />
            <input type="range" min="0" max="100" className="h-1 w-20 bg-gray-600 rounded appearance-none cursor-pointer" />
          </div>
        </div>
      )}

      <audio ref={audioRef} />
    </div>
  );
}

export default MainLayout;
