import { isExists } from '../utils/exist.js';

export const getNewCurrentDir = async (pathToFolder) => {
  const isPathExist = await isExists(pathToFolder);
  if (isPathExist) { return pathToFolder; }
  else {
    return null;
  }
}