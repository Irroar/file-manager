import { appendFile } from 'fs/promises';
import { join } from 'path';
import { isExists } from '../utils/exist.js';

export const create = async (currentDir, fileName) => {
  const pathToFile = join(currentDir, fileName);
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