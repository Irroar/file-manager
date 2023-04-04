import { join } from 'path';
import { getNewCurrentDir } from "./cd.js";

export const goUp = async (currentDir) => {
  return await getNewCurrentDir(join(currentDir, '..'));
}