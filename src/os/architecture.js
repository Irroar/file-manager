import { arch } from 'os';

export const getArchitecture = () => {
  return arch();
}