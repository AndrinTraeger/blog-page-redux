import React, { useState, useEffect } from 'react';
import axios from "axios"

const ServerStatus = () => {
  const [isServerRunning, setIsServerRunning] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        // Replace 'http://localhost:3000' with the URL of your JSON server.
        const response = await axios.get('http://localhost:3500');
        if (response.status === 200) {
          setIsServerRunning(true);
        }
      } catch (error) {
        setIsServerRunning(false);
      }
    };

    checkServerStatus();
  }, []);

  return (
    <div>
      {isServerRunning ? (
        <div style={{ color: 'green' }}>
          <span>&#11044;</span> JSON Server is Running
        </div>
      ) : (
        <div style={{ color: 'red' }}>
          <span>&#11044;</span> JSON Server is Offline
        </div>
      )}
    </div>
  );
};

export default ServerStatus;