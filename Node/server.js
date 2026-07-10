import express from 'express';
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Using a map for key / value pair as it allows direct lookups:
const connectedClients = new Map();
const messages = [{}, {}];

// Ensure strings follow consistent rules, to expand later:
function sanitiseString(string) {
  if (!string || typeof string !== 'string') return;
  return string.trim();
}

function broadcastToClient(type, data) {
  if (type === 'clientList') {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ 'type': type, 'data': data }));
    })
    return;
  }
}

wss.on('connection', (ws) => {
  // Assign a client ID to identify the client:
  const clientID = crypto.randomUUID();
  console.log(`Client ${clientID} has connected.`);
  // Push to list & send to clients:
  connectedClients.set(clientID, { username: '' });
  ws.send(JSON.stringify({ 'type': 'clientID', 'data': clientID }));
  broadcastToClient('clientList', connectedClients);


  ws.on('message', (message) => {
    try {
      const messageJSON = JSON.parse(message);
      let username;

      if (messageJSON.type === 'username') {
        username = messageJSON.data;
        if (connectedClients) {
          const client = connectedClients.get(clientID);
          if (client) client.username = username;
          ws.send(JSON.stringify({ type: 'thisUser', data: { id: clientID, username: username } }));
          broadcastToClient('clientList', connectedClients);
        }
      }
    } catch (e) { console.log(e); }
  });

  ws.on('close', () => {
    // When a user disconnects, remove them from the list, then publish the updated list to all clients:
    console.log(`${clientID} has disconnected.`);
    const disconnectedUser = connectedClients.get(clientID);
    if (disconnectedUser) connectedClients.delete(clientID);
    broadcastToClient('clientList', connectedClients);
  });
});

server.listen(8000, () => {
  console.log(`App running on ${8000}`);
})