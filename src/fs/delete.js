import { rm } from 'fs/promises';
import { isExists } from '../utils/exist.js'

export const remove = async (pathToFile, silentMode=false) => {  
  try {
    const isFileExists = await isExists(pathToFile);
    if (!isFileExists) {
      throw new Error('Operation failed');
    }
    await rm(pathToFile);
    if (!silentMode) { console.log('File deleted successfully'); }
  } catch(err) {
    console.log('Operation failed');
  }
};