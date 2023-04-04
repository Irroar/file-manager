import { readdir } from 'fs/promises';

export const showList = async (path) => {
  return await readdir(path);
}