# Simple CLI File Manager

File Manager implementation using Node.js APIs.

## How to run:

```
npm run start -- --username=your_username
```

## Supported operations
  - Navigation & working directory (nwd): **up**, **cd**, **ls**
  - Basic operations with files: **cat**, **add**, **rn**, **cp**, **mv**, **rm**
  - Operating system info: **os** --EOL, --cpus, --homedir, --username, --architecture
  - Hash calculation: **hash**
  - Compress and decompress operations: **compress**, **decompress**

## Compress and decompress operations

When performing archive and unzip operations, please specify the path to the file along with its extension, for example:

```
compress myfile.txt myarchive.br
```

## Reaction to more amount of arguments than expected

At this point, when entering a large number of arguments, the extra ones are discarded, for example:

```
add new_file.md one_more_file.md
```

Will be created just *new_file.md*, and *one_more_file.md* will be ignored.
