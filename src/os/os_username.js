import { hostname } from 'os';

export const getOsUsername = () => {
  return hostname();
}