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
      // TODO: validate args
      const newDir = await getNewCurrentDir(currentDir, input.split(' ')[1]);
      if (newDir) {
        currentDir = newDir;
        process.stdout.write(getCurrentDirMsg(currentDir));
      } else {
        process.stdout.write('Operation failed\n');
        process.stdout.write(getCurrentDirMsg(currentDir));
      }
      break;
    case 'ls':
      // TODO: validate args
      const fileNames = await showList(currentDir);
      fileNames.forEach((fileName) => {
        console.log(fileName);
      });
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'cat':
      await read(join(currentDir, input.split(' ')[1]));
      break;
    case 'add':
      await create(currentDir, input.split(' ')[1]);
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'rn':
      // TODO: validate args
      await rename(join(currentDir, input.split(' ')[1]), join(currentDir, input.split(' ')[2]));
      break;
    case 'cp':
      // TODO: validate args
      await copy(input.split(' ')[1], join(currentDir, input.split(' ')[1]), join(currentDir, input.split(' ')[2]));
      break;
    case 'mv':
      await move(input.split(' ')[1], join(currentDir, input.split(' ')[1]), join(currentDir, input.split(' ')[2]));
      break;  
    case 'rm':
      await remove(join(currentDir, input.split(' ')[1]));
      break;
    case 'os':
      parseArg(input.split(' ')[1]);
      process.stdout.write(getCurrentDirMsg(currentDir));
      break;
    case 'hash':
      await calculateHash(join(currentDir, input.split(' ')[1]));
      break;
    case 'compress':
      await compress(join(currentDir, input.split(' ')[1]), join(currentDir, input.split(' ')[2]));
      break;
    case 'decompress':
      await decompress(join(currentDir, input.split(' ')[1]), join(currentDir, input.split(' ')[2]));
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