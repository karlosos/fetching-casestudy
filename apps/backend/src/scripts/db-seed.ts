import { insertElement, InsertElement } from '../models/elements.model';

const elements: InsertElement[] = [
  {
    id: 1,
    dn: '125342.T-MOBILE.COM',
    deviceType: 'eNodeB',
    latitude: '123421.312312',
    longitude: '12313421.123123',
    ip: '129.120.120.0',
  },
  {
    id: 2,
    dn: 'BTS-ALFA.T-MOBILE.COM',
    deviceType: 'eNodeB',
    latitude: '123421.312312',
    longitude: '12313421.123123',
    ip: '129.120.120.0',
  },
  {
    id: 3,
    dn: 'BTS-123.ORANGE.COM',
    deviceType: 'eNodeB',
    latitude: '123421.312312',
    longitude: '12313421.123123',
    ip: '129.120.120.0',
  },
  {
    id: 4,
    dn: 'BTS-123.FROM.BACKEND',
    deviceType: 'eNodeB',
    latitude: '123421.312312',
    longitude: '12313421.123123',
    ip: '129.120.120.0',
  },
];

const seed = async () => {
  for (const element of elements) {
    await insertElement(element);
  }
};

seed();
