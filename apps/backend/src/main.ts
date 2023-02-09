/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import * as path from 'path';

const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

app.get('/api/v1/elements', (req, res) => {
  res.send({
    elements: [
      {
        dn: '125342.T-MOBILE.COM',
        deviceType: 'eNodeB',
        options: {
          latitude: '123421.312312',
          longitude: '12313421.123123',
          ip: '129.120.120.0',
        },
      },
      {
        dn: 'BTS-ALFA.T-MOBILE.COM',
        deviceType: 'eNodeB',
        options: {
          latitude: '123421.312312',
          longitude: '12313421.123123',
          ip: '129.120.120.0',
        },
      },
      {
        dn: 'BTS-123.ORANGE.COM',
        deviceType: 'eNodeB',
        options: {
          latitude: '123421.312312',
          longitude: '12313421.123123',
          ip: '129.120.120.0',
        },
      },
    ],
    pageInfo: {
      totalPages: 1,
      totalElements: 3,
      numberOfElements: 3,
      page: 1,
      limit: 50,
    },
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
