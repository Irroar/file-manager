# Simple CLI File Manager

### Описание таска по ссылке https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md

## Как запускать:

```
npm run start -- --username=your_username
```

## Compress and decompress operations

При выполнении операций архивации и разархивации, пожалуйста, указывайте путь к файлу вместе с его расширением, например:

```
compress myfile.txt myarchive.br
```

## Реакция на бОльшее количество аргументов

На данный момент при вводе бОльшего количества аргументов лишние отбрасываются, например:

```
add new_file.md one_more_file.md
```

Будет создан лишь *new_file.md*, а *one_more_file.md* проигнорируется.