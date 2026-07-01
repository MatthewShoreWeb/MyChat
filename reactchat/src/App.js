import './App.css';
import { useState } from 'react';

const socket = new WebSocket('ws://localhost:8000');
socket.onopen = () => console.log('connected');

function App() {
  const [text, updateText] = useState('');
  return (
    <div id='container'>
      <div id='chatContainer'>
        <input id='chatInput' type='text' placeholder='Enter a message' onChange={(e) => updateText(e.target.value)} />
        <button id='sendBtn' onClick={() => { socket.send(text) }}>
          Send message
        </button>
      </div>

    </div>
  );
}

export default App;
