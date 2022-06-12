import { createInterface } from 'readline';
import { join, isAbsolute } from 'path';

import { getUsername } from './utils/username.js';
import { getHomeDir } from './os/homedir.js';
import { getCurrentDirMsg } from './utils/currentDirMsg.js'
import { getNewCurrentDir } from './nwd/cd.js'
import { showList } from './nwd/list.js'
import { rename } from './fs/rename.js';
import { copy } from './fs/copy.js';
import { remove } from './fs/delete.js';
import { move } from './fs/move.js';
import { create } from './fs/create.js';
import { read } from './fs/read.js';
import { goUp } from './nwd/up.js';
import { parseArg } from './os/parseArgs.js';
import { calculateHash } from './hash/calcHash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js'

import { validateArgs } from './utils/validation.js'



const username = getUsername();
let currentDir = getHomeDir();


const rl = createInterface(process.stdin, process.stdout);
process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
process.stdout.write(getCurrentDirMsg(currentDir));

rl.on('line', async (input) => {
  if (input.trim() === '.exit') {
    rl.close();
    process.exit(0);
  }
  switch(input.split(' ')[0]) {
    case 'up':
      const parentDir = await goUp(currentDir);
      if (parentDir) {
        currentDir = parentDir;
        process.stdout.write(getCurrentDirMsg(currentDir));
      } else {
        process.stdout.write('Operation failed\n');
        process.stdout.write(getCurrentDirMsg(currentDir));
      }
      break;
    case 'cd':
      const pathToMove = validateArgs(input, 'cd', currentDir);
      const newDir = await getNewCurrentDir(pathToMove);
      if (newDir) {
        currentDir = newDir;
        process.stdout.write(getCurrentDirMsg(currentDir));
      } else {
        process.stdout.write('Operation failed\n');
        process.stdout.write(getCurrentDirMsg(currentDir));
      }
      break;
    case 'ls':
      const fileNames = await showList(currentDir);
      fileNames.forEach((fileName) => {
        console.log(fileName);
      });
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'cat':
      const pathToFileToRead = validateArgs(input, 'cat', currentDir);
      if (pathToFileToRead) { await read(pathToFileToRead); }
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'add':
      const pathToNewFile = validateArgs(input, 'add', currentDir);
      console.log(pathToNewFile)
      if (pathToNewFile) { await create(pathToNewFile) };
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'rn':
      const { oldPathToFile, newPathToFile } = validateArgs(input, 'rn', currentDir) || { };
      if (oldPathToFile && newPathToFile)  {await rename(oldPathToFile, newPathToFile); }
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'cp':
      const { oldPathToFile: sourcePath, newPathToFile: destPath } = validateArgs(input, 'cp', currentDir) || { };
      if (sourcePath && destPath)  { await copy(input.split(' ')[1], sourcePath, destPath); }
      process.stdout.write(getCurrentDirMsg(currentDir)); 
      break;
    case 'mv':
      const { oldPathToFile: sourcePathToMove, newPathToFile: destPathToMove } = validateArgs(input, 'mv', currentDir) || { };
      if (sourcePathToMove && destPathToMove)  { await move(input.split(' ')[1], sourcePathToMove, destPathToMove); }
      process.stdout.write(getCurrentDirMsg(currentDir));   
      break;  
    case 'rm':
      const pathToRemove = validateArgs(input, 'rm', currentDir);
      if (pathToRemove) { await remove(pathToRemove); }
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'os':
      parseArg(validateArgs(input, 'os'));
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'hash':
      const pathToFileForHash = validateArgs(input, 'hash', currentDir);
      if (pathToFileForHash) { await calculateHash(pathToFileForHash); }
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'compress':
      const { oldPathToFile: pathToFileToCompress, newPathToFile: pathToCompressedFile } = validateArgs(input, 'zip', currentDir) || { };
      if (pathToFileToCompress && pathToCompressedFile)  {await compress(pathToFileToCompress, pathToCompressedFile); }
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'decompress':
      const { oldPathToFile: pathToFileToDecompress, newPathToFile: pathToDecompressedFile } = validateArgs(input, 'zip', currentDir) || { };
      if (pathToFileToDecompress && pathToDecompressedFile) { await decompress(pathToFileToDecompress, pathToDecompressedFile); }
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    default:
      process.stdout.write('Invalid input\n');
      process.stdout.write(getCurrentDirMsg(currentDir));
  }
});

process.on('SIGINT', () => {
  process.exit(0);
});

process.on('exit', (code) => {
  if (code === 0) { 
    process.stdout.write(`Thank you for using File Manager, ${username}!`); 
  }
});