import { appendFile } from 'fs/promises';
import { isExists } from '../utils/exist.js';

export const create = async (pathToFile) => {
  try {
    const isFileExists = await isExists(pathToFile);
    if (isFileExists) {
      throw new Error('Operation failed');
    }
    await appendFile(pathToFile, '');
    console.log('File was successfuly created');
  }
  catch(err) {
    console.log('Operation failed');
  }
};