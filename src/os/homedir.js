import { homedir } from 'os';

export const getHomeDir = () => {
  return homedir();
}