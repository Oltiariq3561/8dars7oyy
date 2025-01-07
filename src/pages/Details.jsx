import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTrack, togglePlayPause, setPlaylist } from '../Redux/audioSlice';
import https from '../axios';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isPlaying, selectedTrack, playlist } = useSelector((state) => state.audio);
  const audioRef = useRef(null); 

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      const token = localStorage.getItem('spotify_token');
      try {
        const response = await https.get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setPlaylist(response.data)); 
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      }
    };

    fetchPlaylistDetails();
  }, [id, dispatch]);
  useEffect(() => {
    if (playlist) {
      console.log("Playlist data in UI component:", playlist); 
    }
  }, [playlist]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (selectedTrack && selectedTrack.preview_url) {
      audioRef.current = new Audio(selectedTrack.preview_url); 
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [selectedTrack, isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    dispatch(togglePlayPause());
  };

  const handleSelectTrack = (track) => {
    dispatch(setSelectedTrack(track)); 
  };

  if (!playlist) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white p-6">
      <div className="flex items-end p-4 bg-gradient-to-b from-yellow-400 to-transparent rounded-lg">
        <img
          src={selectedTrack ? selectedTrack.album.images[0]?.url : playlist.images[0]?.url}
          alt={selectedTrack ? selectedTrack.name : playlist.name}
          className="w-48 h-48 object-cover rounded-md mr-6"
        />
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {selectedTrack ? selectedTrack.name : playlist.name}
          </h1>
          <p className="text-sm text-gray-200">
            {selectedTrack
              ? selectedTrack.artists.map(artist => artist.name).join(', ')
              : playlist.description || 'No description available'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {selectedTrack
              ? selectedTrack.album.name
              : `${playlist.owner.display_name} • ${playlist.tracks.total} songs`}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePlayPause}
          className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-400"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <table className="w-full mt-6 text-left text-gray-400">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2">#</th>
            <th className="py-2">TITLE</th>
            <th className="py-2">ALBUM</th>
            <th className="py-2">DATE ADDED</th>
            <th className="py-2 text-right">DURATION</th>
          </tr>
        </thead>
        <tbody>
          {playlist.tracks.items.map((trackItem, index) => (
            <tr
              key={index}
              className="hover:bg-gray-800 cursor-pointer"
              onClick={() => handleSelectTrack(trackItem.track)}
            >
              <td className="py-3">{index + 1}</td>
              <td className="py-3 flex items-center gap-4">
                <img src={trackItem.track.album.images[0]?.url} alt={trackItem.track.name} className="w-10 h-10 rounded" />
                <div>
                  <span className="text-white font-semibold">{trackItem.track.name}</span>
                  <p className="text-sm text-gray-400">{trackItem.track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
              </td>
              <td className="py-3">{trackItem.track.album.name}</td>
              <td className="py-3">Date not available</td>
              <td className="py-3 text-right">
                {Math.floor(trackItem.track.duration_ms / 60000)}:{((trackItem.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
