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

        setData(response.data);  
        console.log(response.data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='players-container'>
        {data && data.response.map((player, index) => (
            <Players key={index} player={player} />
      ))}
    </div>
  );
};

export default MyComponent;