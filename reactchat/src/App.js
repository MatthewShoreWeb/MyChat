import './App.css';
import { useState } from 'react';
import ClientList from './Components/ClientList/ClientList.tsx';

const socket = new WebSocket('ws://localhost:8000');
socket.onopen = () => console.log('connected');

function App() {
  const [text, updateText] = useState('');
  const [clientList, updateClientList] = useState([]);

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (!data || !data.type || !data.data) return;

      if (data.type === 'clientList') {
        const clientList = data.data.split(',');
        updateClientList(clientList);
      } 
    } catch (e) { }
  }

  return (
    <div id='container'>
      <ClientList clients={clientList} />
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
