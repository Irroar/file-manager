import { getArchitecture } from './architecture.js';
import { getCpusInfo } from './cpus.js';
import { getEOL } from './eol.js';
import { getHomeDir } from './homedir.js';
import { getOsUsername } from './os_username.js';

export const parseArg = (arg) => {
  switch (arg.slice(2)) {
    case 'EOL':
      console.log(getEOL());
      break;
    case 'cpus':
      console.log(getCpusInfo());
      break;
    case 'homedir':
      console.log(getHomeDir());
      break;
    case 'username':
      console.log(getOsUsername());
      break;
    case 'architecture':
      console.log(getArchitecture());
      break;
    default:
      console.log('Invalid input');
  }
}