import './App.css';
import { useEffect, useState } from 'react';
import ClientList from './Components/ClientList/ClientList.tsx';
import WelcomeMessage from './Components/WelcomeMessage/WelcomeMessage.tsx';
import ChatContainer from './Components/Chat/ChatContainer.tsx';

const socket = new WebSocket('ws://localhost:8000');
socket.onopen = () => console.log('connected');

function App() {
  const [text, updateText] = useState('');
  const [clientList, updateClientList] = useState([]);
  const [popupModal, updateModal] = useState(<WelcomeMessage confirmClicked={welcomeConfirm} />);
  const [modalVisibility, updateVisibility] = useState('block');
  const [thisUser, updateThisUser] = useState('');
  
  // End user is who the client currently talking to:
  const [endUser, updateEndUser] = useState('');

  function welcomeConfirm(name) {
    // Close the modal:
    updateModal(<></>);
    updateVisibility('none');
    socket.send(JSON.stringify({ 'type': 'username', 'data': name }));
  }

  // Wrapped here to tie to the component's lifecycle:
  useEffect(() => {
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (!data || typeof data.type !== 'string') return;


        if (data.type === 'thisUser') {
          updateThisUser(data.data);
        }
        
        if (data.type === 'clientList' && data.data && data.data[0][1].username) {
          updateClientList(data.data.map((client) => { return {"id": client[0], "username": client[1].username} }));
          return;
        }
      } catch (e) { }
    }
  }, []);

  function selectUser(clientInfo) {
    if (typeof clientInfo !== 'object') return;
    updateEndUser(clientInfo);
  }

  function sendMessage(message) {
    console.log('sending message')
    if (typeof message !== 'string' || !endUser) return;
    socket.send({'type': 'chatMessage', 'data': {'message': message, 'endUser': endUser }});
  }

  // Ensures that the client the user is on is not includes in the list of connectable clients:
  const visibleClients = clientList.filter((client) => client.id !== thisUser?.id);

  return (
    <div id='container'>
      <div id='popupModal' style={{ display: modalVisibility }}>
        {popupModal}
      </div>

      <div id='appBody'>
        <ClientList me={thisUser} clients={visibleClients} selectUser={selectUser} />
        <ChatContainer endUser={endUser} sendMessage={sendMessage}/>
      </div>

    </div>
  );
}

export default App;
