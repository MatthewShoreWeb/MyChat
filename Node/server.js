import express from 'express';
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Data structure: {id: '', name: ''}
const connectClients = [];

// Ensure strings follow consistent rules, to expand later:
function sanitiseString(string) {
  if (!string || typeof string !== 'string') return;
  return string.trim();
}

function broadcastToClient(type, data) {
  if (type === 'clientList') {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ 'type': type, 'data': data}));
    })
    return;
  } 
}

wss.on('connection', (ws) => {
  // Assign a client ID to identify the client:
  const clientID = crypto.randomUUID();
  console.log(`Client ${clientID} has connected.`);
  // Push to list & send to clients:
  connectClients.push({id: clientID, username: ''});
  ws.send(JSON.stringify({ 'type': 'clientID', 'data': clientID }));
  broadcastToClient('clientList', connectClients);


  ws.on('message', (message) => {
    try {
      const messageJSON = JSON.parse(message);
      let username;
      
      if (messageJSON.type === 'username') {
        username = messageJSON.data;
        if (connectClients.length) {
          connectClients.forEach((item) => {
            if (item.id === clientID) item.username = username;
          })
          ws.send(JSON.stringify({type: 'thisUser', data: {id: clientID, username: username}}));
          broadcastToClient('clientList', connectClients);
        }
      }
    } catch (e) { console.log(e); }
  });

  ws.on('close', () => {
    console.log(`${clientID} has disconnected.`);
    // When a user disconnects, remove them from the list, then publish the updated list to all clients:
    console.log(`${clientID} has disconnected.`);
    const index = connectClients.findIndex(client => client.id === clientID);
if (index !== -1) connectClients.splice(index, 1);
    broadcastToClient('clientList', connectClients);
  });
});

server.listen(8000, () => {
  console.log(`App running on ${8000}`);
})