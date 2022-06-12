import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

export const decompress = async (pathToFile, pathToDestinationFolder) => {
  const pipe = promisify(pipeline);

  const sourseReadStream = createReadStream(pathToFile);
  const destinationWriteStream = createWriteStream(pathToDestinationFolder);

  const gzipTransformStream = createBrotliDecompress();
  
  try {
    await pipe(sourseReadStream, gzipTransformStream, destinationWriteStream);
  } catch(err) {
    console.log('Operation failed');
  }
};
