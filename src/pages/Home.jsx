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
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found, please check the token generation process.");
        return;
      }
      try {
        const [topMixesResponse, madeForYouResponse, recentlyPlayedResponse, jumpBackInResponse, uniquelyYoursResponse, featuredPlaylistsResponse] = await Promise.all([
          https.get('categories/toplists/playlists'),
          https.get('categories/0JQ5DAqbMKFHOzuVTgTizF/playlists'),
          https.get('categories/0JQ5DAqbMKFQ00XGBls6ym/playlists'),
          https.get('categories/0JQ5DAqbMKFCbimwdOYlsl/playlists'),
          https.get('categories/0JQ5DAqbMKFLVaM30PMBm4/playlists'),
          https.get('featured-playlists'),
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
      <div className='bg-[#2b2b6b] p-5 bg-gradient-to-b from-[#12123d] via-[#282853] to-[#10101a]'>
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
    </div>
  );
};

export default Home;
