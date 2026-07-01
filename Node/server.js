import express from 'express';
import { WebSocketServer } from 'ws';
import { randomUUID } from 'crypto';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); 

// Ensure strings follow consistent rules, to expand later:
function sanitiseString(string) {
    if (!string || typeof string !== 'string') return;
    return string.trim();
}

wss.on('connection', (ws) => {
  // Assign a client ID to identify the client:
  const clientID = crypto.randomUUID();
  console.log(`Client ${clientID} has connected.`);

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send('Welcome to the WebSocket server!');
});


server.listen(8000, () => {
  console.log(`App running on ${8000}`);
})