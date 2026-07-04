import './App.css';
import { useEffect, useState } from 'react';
import ClientList from './Components/ClientList/ClientList.tsx';
import WelcomeMessage from './Components/WelcomeMessage/WelcomeMessage.tsx';

const socket = new WebSocket('ws://localhost:8000');
socket.onopen = () => console.log('connected');

function App() {
  const [text, updateText] = useState('');
  const [clientList, updateClientList] = useState([]);
  const [popupModal, updateModal] = useState(<WelcomeMessage confirmClicked={welcomeConfirm} />);
  const [modalVisibility, updateVisibility] = useState('block');
  const [thisUser, updateThisUser] = useState('');

  function welcomeConfirm(name) { 
    // Close the modal:
    updateModal(<></>);
    updateVisibility('none');
    socket.send(JSON.stringify({'type': 'username', 'data': name}));
  }

  socket.onmessage = (event) => {
    console.log(event.data);
    try {
      const data = JSON.parse(event.data);
      if (!data || !data.type || !data.data) return;

      if (data.type === 'thisUser' && data && data.data) {
        updateThisUser(data.data);
      }

      if (data.type === 'clientList' && data && data.data) {
        updateClientList(data.data.filter(client => client.id && client.username));
        return;
      }
    } catch (e) { }
  }

  // Ensures that the client the user is on is not includes in the list of connectable clients:
  useEffect(() => {
    if (!clientList || !thisUser) return;
    updateClientList(clientList.filter(item => item.id !== thisUser.id));
  }, [thisUser]);

  return (
    <div id='container'>
      <div id='popupModal' style={{display: modalVisibility}}>
        {popupModal}
      </div>
      <ClientList me={thisUser} clients={clientList} />
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
