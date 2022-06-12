import { rename as renameFunc } from 'fs/promises';
import { isExists } from '../utils/exist.js';

export const rename = async (pathToOldFile, pathToNewFile) => {
  try {
    const isNewFileExists = await isExists(pathToNewFile);
    const isOldFileExists = await isExists(pathToOldFile);
    if (!isOldFileExists || isNewFileExists) { throw new Error('Operation failed'); }

    await renameFunc(pathToOldFile, pathToNewFile);
    console.log('File renamed successfully');
  } catch(err) {
    console.log(err.message);
  }

};