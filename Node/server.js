import express from 'express';
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const connectClients = [];

// Ensure strings follow consistent rules, to expand later:
function sanitiseString(string) {
  if (!string || typeof string !== 'string') return;
  return string.trim();
}

function broadcastToClient(type, data) {
  if (type === 'clientList') {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ 'type': type, 'data': data.join(',') }));
    })
  }

}


wss.on('connection', (ws) => {
  // Assign a client ID to identify the client:
  const clientID = crypto.randomUUID();
  console.log(`Client ${clientID} has connected.`);
  // Push to list & send to clients:
  connectClients.push(clientID);
  broadcastToClient('clientList', connectClients);

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    // connectClients.delete(clientID)
  });
});


server.listen(8000, () => {
  console.log(`App running on ${8000}`);
})