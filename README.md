# Проект АнтиХвост (серверная часть)

## Установка окружения

1. Установить среду разработки [Visual Studio Code](https://code.visualstudio.com/download)\
   Установить расшириения: ESLint, Prettier, Prisma, Docker
2. Установить [Git](https://git-scm.com/downloads)
3. Установить [NodeJs](https://nodejs.org/en/download)
4. Установить [Docker Desktop](https://www.docker.com/products/docker-desktop/)
5. Установить [Postman](https://www.postman.com/downloads/)

## Команды для работы с GIT

### Инициализация Git в корне проекта

```sh
git init
```

### Установка связи с удаленным репозиторием

```sh
git remote add origin https://github.com/mkstas/nest-antitail-api.git
```

### Скачивание с удаленного репозитория

```sh
git pull origin master
```

### Добавление файлов в коммит

```sh
git add <названия файлов или точка(.) для добавления всех файлов>
```

### Создание коммита

```sh
git commit -m <название>
```

### Загрузка на удаленный репозиторий

```sh
git push origin master
```

## Инициализация проекта

Создать в корне проекта файл **.env** и скопировать в него содержимое файла **.env.example**\
Сущности базы данных необходимо описывать в файле **schema.prisma**

### Установка проекта

```sh
npm install
```

### Запуск проекта в режиме разработки

```sh
npm run start:dev
```

## Установка базы данных

### Сборка базы данных

```sh
docker-compose build
```

### Запуск базы данных

```sh
docker-compose up -d
```

## Взаимодействие с базой данных

### Создание миграций для базы данных

```sh
npx prisma migrate dev
```

### Запуск интерфейса для просмотра содержимого базы данных

```sh
npx prisma studio
```
