import './App.css';
import { useState } from 'react';
import ClientList from './Components/ClientList/ClientList.tsx';
import WelcomeMessage from './Components/WelcomeMessage/WelcomeMessage.tsx';

const socket = new WebSocket('ws://localhost:8000');
socket.onopen = () => console.log('connected');

let userName = '';

function App() {
  const [text, updateText] = useState('');
  const [clientList, updateClientList] = useState([]);
  const [popupModal, updateModal] = useState(<WelcomeMessage confirmClicked={welcomeConfirm} />);
  const [modalVisibility, updateVisibility] = useState('block');

  function welcomeConfirm() {
    console.log('click');
    // Close the modal:
    updateModal(<></>);
    document.querySelector('#popupModal').style.display = 'none'; // Remove this.
  }

  socket.onmessage = (event) => {
    console.log(event);
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
      <div id='popupModal' style={{display: modalVisibility}}>
        {popupModal}
      </div>
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
