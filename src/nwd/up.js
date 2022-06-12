import { getNewCurrentDir } from "./cd.js";

export const goUp = async (currentFolder) => {
  return await getNewCurrentDir(currentFolder, '..');
}