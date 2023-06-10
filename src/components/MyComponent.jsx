import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Players from './Players';

function MyComponent() {
  const [data, setData] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        //------------------------------------------------------------------------------------------
        //Call to get most recent game
        //------------------------------------------------------------------------------------------
        const gameResponse = await axios.get('https://api-nba-v1.p.rapidapi.com/games', {
          params: {
            team: '20',
            season: '2022'
          },
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
          }
        });

        //get rid of scheduled games
        const gamesNotNull = gameResponse.data.response.filter(game => {
          return game.status.long !== 'Scheduled';
        });
        //take only the last game in the array because it is the most recent without being scheduled
        const recentGame = gamesNotNull[gamesNotNull.length - 1];
        console.log(recentGame);
        setGame(recentGame);

        //------------------------------------------------------------------------------------------
        //Call to get player stats
        //------------------------------------------------------------------------------------------
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/players/statistics', {
          params: {
            game: recentGame.id, 
            team: '20',
            season: '2022'
          },
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
          }
        });

        const sortedPlayers = response.data.response.sort((a, b) => {
          const minA = parseInt(a.min, 10);
          const minB = parseInt(b.min, 10);

          return minB - minA;  // For descending order
        });

        setData(sortedPlayers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  //This slices the array to map the first five to a separate div than the rest
  return (
    <div className='players-container'>
      <h1 className='header'>{game && game.teams.home.name} VS. {game && game.teams.visitors.name}</h1>
      <h1 className='header-score'>{game && game.scores.home.points} - {game && game.scores.visitors.points}</h1>
      <h2 className='impact'>Impact Players</h2>
      <div className="first-five-players">
        {data && data.slice(0, 5).map((player, index) => (
          <Players key={index} player={player} />
        ))}
      </div>
      <h2>Team</h2>
      <div className="rest-of-players">
        {data && data.slice(5).map((player, index) => (
          <Players key={index} player={player} />
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
