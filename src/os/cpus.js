import { cpus } from 'os';

export const getCpusInfo = () => {
  return cpus().map((item) => {
    const { model, speed } = item;
    return { model, speed };
  });
}