import { copy } from './copy.js';
import { remove } from './delete.js';

export const move = async (fileName, pathToFile, pathToDestinationFolder) => {
  try {
    await copy(fileName, pathToFile, pathToDestinationFolder, true);
    await remove(pathToFile, true);
    console.log('File moved successfully');
  } catch(err) {
    console.log('Operation failed');
  }
}