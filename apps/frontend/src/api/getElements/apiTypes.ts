export type GetElementsRequest = {
  startIndex: number;
  size: number;
};

export type GetElementsResponse = {
  elements: ElementData[];
  totalElements: number;
};

// TODO: ElementData name is not the best. What is the "Data"? 
//       Rename it to just "Element"
export type ElementData = {
  id: string;
  dn: string;
  latitude: string;
  longitude: string;
  ip: string;
  deviceType: DeviceType;
};

export enum DeviceType {
  nodeB = 'nodeB',
  eNodeB = 'eNodeB',
  gNodeB = 'gNodeB',
}
