import { copyFile } from 'fs/promises';
import { join, isAbsolute, sep } from 'path';
import { isExists } from '../utils/exist.js';

export const copy = async (fileName, pathToFile, pathToDestinationFolder, silentMode=false) => {
  try {
    const isFileExists = await isExists(pathToFile);
    const isDestinationFolderExists = await isExists(pathToDestinationFolder);

    if (!isFileExists || !isDestinationFolderExists) { 
      throw new Error('Operation failed'); 
    }

    let arr = fileName.split(sep);
    fileName = arr[arr.length - 1];
    
    const newPathToFile = join(pathToDestinationFolder, fileName);
    
    
    await copyFile(pathToFile, newPathToFile);
    if (!silentMode) { console.log('File copied successfully'); }
  } catch(err) {
    if (silentMode) { throw err; }
    console.log('Operation failed');
  }
}