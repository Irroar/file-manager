import { join, isAbsolute } from 'path';

export const validateArgs = (input, options, currentDir) => {
  if (options === 'os') {
    try {
      const arg = input.split(' ')[1];
      return arg;
    } catch(err) {
      console.log('Invalid input');
    }
  }

  if (options === 'cat' || options === 'cd') {
    try {
      const arg = input.split(' ')[1];
      if (isAbsolute(arg)) {
        return arg;
      } else {
        return join(currentDir, arg);
      }   
    } catch(err) {
      console.log('Invalid input');
    }
  }

  if (options === 'add') {
    try {
      const arg = input.split(' ')[1];
      return join(currentDir, arg);
    } catch(err) {
      console.log('Invalid input');
    }
  }

  if (options === 'rm' || options === 'hash') {
    try {
      const arg = isAbsolute(input.split(' ')[1]) === true ? input.split(' ')[1] : join(currentDir, input.split(' ')[1]);
      return arg;
    } catch(err) {
      console.log('Invalid input');
    }
  }

  if (options === 'rn' || options === 'cp' || options === 'mv' || options === 'zip') {
    try {
      const oldPathToFile = isAbsolute(input.split(' ')[1]) === true ? input.split(' ')[1] : join(currentDir, input.split(' ')[1]);
      const newPathToFile = isAbsolute(input.split(' ')[2]) === true ? input.split(' ')[2] : join(currentDir, input.split(' ')[2]);
      return { oldPathToFile, newPathToFile }
    } catch(err) {
      console.log('Invalid input');
    }
  }
}