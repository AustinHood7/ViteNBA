import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Players from './Players';

function MyComponent() {
  const [data, setData] = useState(null);

  //to figure out the game id of the most recent game we must fetch the games played by a team in a given year and then sort in decending order
  //this is because the list of teams is recieved in oldest to newest this year
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-nba-v1.p.rapidapi.com/players/statistics', {
          params: {
            game: '12473',
            team: '20',
            season: '2022'
          },
          headers: {
            'X-RapidAPI-Key': '000ab2eadbmshdb5e264cda6750ap1ec88djsn2fd937e60c56',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
          }
        });

        const sortedPlayers = response.data.response.sort((a, b) => {
          const minA = parseInt(a.min, 10);
          const minB = parseInt(b.min, 10);

          return minB - minA;  // For descending order
        });

        setData(sortedPlayers);
        console.log(sortedPlayers)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='players-container'>
      <h2>Impact Players</h2>
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