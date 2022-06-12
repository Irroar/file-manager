import { copyFile } from 'fs/promises';
import { join } from 'path';
import { isExists } from '../utils/exist.js';

export const copy = async (fileName, pathToFile, pathToDestinationFolder, silentMode=false) => {
  try {
    const isFileExists = await isExists(pathToFile);
    const isDestinationFolderExists = await isExists(pathToDestinationFolder);

    if (!isFileExists || !isDestinationFolderExists) { 
      throw new Error('Operation failed'); 
    }

    const newPathToFile = join(pathToDestinationFolder, fileName);
    
    await copyFile(pathToFile, newPathToFile);
    if (!silentMode) { console.log('File copied successfully'); }
  } catch(err) {
    console.log('Operation failed');
  }
}