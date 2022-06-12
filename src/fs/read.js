import { createReadStream } from 'fs';
import { isExists } from '../utils/exist.js';

export const read = async (pathToFile) => {
  try {
    const isFileExists = await isExists(pathToFile);
    if (!isFileExists) {
      throw new Error('Operation failed');
    }
    const rs = createReadStream(pathToFile);
    rs.on('readable', () => {
      const data = rs.read();
      if (data !== null) { console.log(data.toString()); }
    });
    rs.on('end', () => {
      console.log('File readed successfully');
      rs.destroy();
    })  
  } catch(err) {
    console.log('Operation failed');
  }
};