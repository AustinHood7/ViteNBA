import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
        params: {
          tag: '3d.mmorpg.fantasy.pvp',
          platform: 'pc',
        },
        headers: {
          'X-RapidAPI-Key': '000ab2eadbmshdb5e264cda6750ap1ec88djsn2fd937e60c56',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setPosts(response.data); // Set the fetched data to the 'posts' state
        setIsLoading(false); // Set 'isLoading' to false once the data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComponent;
