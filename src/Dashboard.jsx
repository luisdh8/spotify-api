import React, { useState } from 'react';
import { spotifyAPI } from './api/spotifyAPI';

const Dashboard = () => {
    const selectTypes = [
        'track',
        'artist',
        'playlist',
        'album',
        'show',
        'episode',
        'audiobook',
    ];
    const [search, setSearch] = useState({
        song: '',
        types: 'track', // Default to 'track'
    });

    const [deviceID, setDeviceID] = useState('');

    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newFom = {
            ...search,
            [name]: value,
        };
        setSearch(newFom);
    };

    const handleSearch = async () => {
        if (!search.types) {
            console.error("Search type is required.");
            return;
        }

        const params = new URLSearchParams();
        params.append('q', `remaster track: ${search.song}`);
        params.append('type', search.types);

        const queryString = params.toString();
        const url = "https://api.spotify.com/v1/search";

        const updateUrl = `${url}?${queryString}`;
        const token = localStorage.getItem("access_token");

        try {
            const response = await spotifyAPI(updateUrl, 'GET', null, token);
            setResults(response.tracks.items);
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    const getDeviceID = async () => {
        const token = localStorage.getItem("access_token");
        const url = "https://api.spotify.com/v1/me/player/devices";
        const response = await spotifyAPI(url, 'GET', null, token);

        console.log(response);
        setDeviceID(response.devices[0].id);
    };

    const handlePlay = async (songUri) => {
        try {
            if (!songUri || typeof songUri !== 'string') {
                throw new Error(`Invalid song URI: ${songUri}`);
            }

            console.log("Playing song with URI:", songUri);

            const token = localStorage.getItem("access_token");
            const data = {
                uris: [songUri],
            };

            const jsonData = JSON.stringify(data);
            console.log("Request body:", jsonData);

            const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;

            const play = await spotifyAPI(url, 'PUT', jsonData, token);
            console.log("Response from Spotify API:", play);
        } catch (error) {
            console.error("Error playing song:", error);
        }
    };

    return (
        <>
            <div>Dashboard</div>
            <button onClick={getDeviceID}>Get Device ID</button>
            <p>Search</p>
            <input
                name="song"
                type="text"
                value={search.song}
                onChange={handleChange}
            />
            <p>Select Types:</p>
            <select name="types" value={search.types} onChange={handleChange}>
                {selectTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button onClick={handleSearch}>Search</button>

            {results.map((result, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div>
                        <img src={result.album.images[0].url} width={150} alt="Album Cover" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
                        <p>{result.artists[0].name}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
                        <button onClick={() => handlePlay(result.uri)}>Play</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Dashboard;