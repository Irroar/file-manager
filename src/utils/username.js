export const getUsername = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.filter((item) => item.indexOf('--username') === 0);
  const username = usernameArg[0].split('=')[1];
  return username;
}