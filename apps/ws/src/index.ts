import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws , request) {

  const url = request.url;
  if (!url) {
    return;
  }

  const queryparams = new URLSearchParams(url.split('?')[1]);
  const token = queryparams.get("token");
  if (!token) {
    ws.close();
    return;
  }



  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});