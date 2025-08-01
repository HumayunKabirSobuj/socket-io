import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { io } from 'socket.io-client';

function App() {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  console.log({notifications});

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('🟢 Connected:', socket.id);
    });

    socket.on('new-notification', (data) => {
      console.log('🔔 Notification received:', data);
      setNotifications((prev) => [data.title, ...prev]); // UI update
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <h2>🔔 Notifications:</h2>
      <ul>
        {notifications.map((note, idx) => (
          <li key={idx}>{note}</li>
        ))}
      </ul>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
