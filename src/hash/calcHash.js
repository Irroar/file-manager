import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export const calculateHash = async (pathToFile) => {
  const hash = createHash('sha256');
  try {
    const rs = createReadStream(pathToFile);
    rs.on('readable', () => {
      const data = rs.read();
      if (data) {
        hash.update(data);
      }
      else {
        console.log(hash.digest('hex'));
      }
    });
  } catch(err) {
    console.log('Operation failed');
  }
};