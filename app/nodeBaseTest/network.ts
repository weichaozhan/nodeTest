import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import querystring from 'querystring';

const port = 8089;

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-type': 'multipart/form-data',
  });

  const body: any[] = [];

  console.log('\n', request.method);
  console.log('\n', request.headers);

  request.on('data', (chunk) => {
    body.push(chunk);
    response.write(chunk);
  });

  request.on('end', () => {
    const buffer = Buffer.concat(body);

    console.log('\n\nreuqest buffer start\n\n', buffer.toString(), '\n\nreuqest buffer end\n\n');
    response.end();
  });
}).listen(port, () => {
  const options = {
    port,
    method: 'post',
    hostname: 'localhost',
    headers: {
      'Content-type': 'multipart/form-data',
    }
  };
  
  const request = http.request(options, (response) => {
    response.on('data', (chunk) => {
      console.log('\n\nresponse buffer start\n\n', decodeURIComponent(chunk.toString()), '\n\response buffer end\n\n');
    });
    response.on('end', () => {
      console.log('\n\n\nno more data\n\n\n');
    });
  });

  request.write(querystring.stringify({
    formtest: 'formtest formtest formtest formtest formtest',
  }));
  request.end();

  console.log(`Server listening to ${port}`);
});

const httpsPort = 8090;
https.createServer({
  rejectUnauthorized: false,
  key: fs.readFileSync(path.resolve('./fileSave/weichaozhan_priv.pem')),
  cert: fs.readFileSync(path.resolve('./fileSave/weichaozhan-cert.pem')),
},(request, response) => {
  response.writeHead(200, {
    'Content-type': 'text/plain',
  });
  response.end('I\'m https reuqest !');
}).listen(httpsPort, () => {
  console.log(`Https server listening to ${httpsPort}`);
});
