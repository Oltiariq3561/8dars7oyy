import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import https from '../axios';

const Home = () => {
  const [playlists, setPlaylists] = useState({
    topMixes: [],
    madeForYou: [],
    recentlyPlayed: [],
    jumpBackIn: [],
    uniquelyYours: [],
    featuredPlaylists: [],
  });

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = localStorage.getItem('spotify_token');
      try {
        const [topMixesResponse, madeForYouResponse, recentlyPlayedResponse, jumpBackInResponse, uniquelyYoursResponse, featuredPlaylistsResponse] = await Promise.all([
          https.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          https.get('https://api.spotify.com/v1/browse/featured-playlists', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setPlaylists({
          topMixes: topMixesResponse.data.playlists.items.slice(0, 4),
          madeForYou: madeForYouResponse.data.playlists.items.slice(0, 4),
          recentlyPlayed: recentlyPlayedResponse.data.playlists.items.slice(0, 4),
          jumpBackIn: jumpBackInResponse.data.playlists.items.slice(0, 4),
          uniquelyYours: uniquelyYoursResponse.data.playlists.items.slice(0, 4),
          featuredPlaylists: featuredPlaylistsResponse.data.playlists.items.slice(0, 6),
        });
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen text-white p-6">
      <div className='bg-[#2b2b6b] p-5  bg-gradient-to-b from-[#12123d] via-[#282853] to-[#10101a]'>
        <h2 className="text-2xl font-bold mb-6">Good afternoon</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {playlists.featuredPlaylists.map((playlist, index) => (
            <Link to={`/playlist/${playlist.id}`} key={index} className="bg-gray-800 rounded-lg p-4 flex items-center hover:bg-gray-700 transition duration-300">
              <img src={playlist.images[0]?.url} alt={playlist.name} className="w-16 h-14 rounded-md mr-4" />
              <span className="text-sm font-medium">{playlist.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Your Top Mixes</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.topMixes.map((playlist, index) => (
          <Link to={`/playlist/${playlist.id}`} key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-40 rounded-md mb-2"/>
            <span className="text-sm font-medium text-center">{playlist.name}</span>
            <p className='text-sm'>{playlist.description}</p>
          </Link>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Made For You</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.madeForYou.map((playlist, index) => (
          <Link to={`/playlist/${playlist.id}`} key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-40 rounded-md mb-2"/>
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </Link>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Recently Played</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.recentlyPlayed.map((playlist, index) => (
          <Link to={`/playlist/${playlist.id}`} key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-40 rounded-md mb-2" />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </Link>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Jump Back In</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.jumpBackIn.map((playlist, index) => (
          <Link to={`/playlist/${playlist.id}`} key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-40 rounded-md mb-2" />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </Link>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Uniquely Yours</h3>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {playlists.uniquelyYours.map((playlist, index) => (
          <Link to={`/playlist/${playlist.id}`} key={index} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center hover:bg-gray-700 transition duration-300">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-40 rounded-md mb-2" />
            <span className="text-sm font-medium text-center">{playlist.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
