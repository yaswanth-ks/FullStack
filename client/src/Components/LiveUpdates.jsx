// Components/LiveUpdates.jsx
import React, { useEffect, useState } from 'react';

const LiveUpdates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // This is where you'd make API calls or WebSocket connections
    // to get live updates. For now, let's simulate with dummy data.
    const dummyUpdates = [
      { id: 1, message: 'Update 1: System is online' },
      { id: 2, message: 'Update 2: New employee added' },
      { id: 3, message: 'Update 3: Server check completed' }
    ];

    setUpdates(dummyUpdates);
  }, []);

  return (
    <div className="container">
      <h2>Live Updates</h2>
      <ul>
        {updates.map(update => (
          <li key={update.id}>{update.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveUpdates;
