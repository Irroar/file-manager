import { join } from 'path';
import { isExists } from '../utils/exist.js';

export const getNewCurrentDir = async (currentFolder, pathToFolder) => {
  const newPath = join(currentFolder, pathToFolder);
  const isPathExist = await isExists(newPath);
  if (isPathExist) { return newPath; }
  else {
    return null;
  }
}