import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

export const compress = async (pathToFile, pathToDestinationFolder) => {
  const pipe = promisify(pipeline);

  const sourseReadStream = createReadStream(pathToFile);
  const destinationWriteStream = createWriteStream(pathToDestinationFolder);

  const gzipTransformStream = createBrotliCompress();
  
  try {
    await pipe(sourseReadStream, gzipTransformStream, destinationWriteStream);
  } catch(err) {
    console.log(err);
  }
};
