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

  function welcomeConfirm(name) {
    // Close the modal:
    updateModal(<></>);
    updateVisibility('none');
    socket.send(JSON.stringify({ 'type': 'username', 'data': name }));
  }

  // Wrapped here to tie to the component's lifecycle:
  useEffect(() => {
    socket.onmessage = (event) => {
      console.log(event.data);
      try {
        const data = JSON.parse(event.data);
        if (!data || !data.type || !data.data) return;

        if (data.type === 'thisUser' && data && data.data) {
          updateThisUser(data.data);
        }

        if (data.type === 'clientList' && data && data.data) {
          // Filter out any values that don't have an id or username:
          updateClientList(data.data.filter(client => client.id && client.username));
          return;
        }
      } catch (e) { }
    }
  }, []);

  // Ensures that the client the user is on is not includes in the list of connectable clients:
  const visibleClients = clientList.filter(c => c.id !== thisUser?.id);

  return (
    <div id='container'>
      <div id='popupModal' style={{ display: modalVisibility }}>
        {popupModal}
      </div>

      <div id='appBody'>
        <ClientList me={thisUser} clients={visibleClients} />
        <ChatContainer />
      </div>

    </div>
  );
}

export default App;
