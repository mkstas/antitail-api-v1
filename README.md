# Проект АнтиХвост (серверное приложение)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Описание 📖

Репозиторий содержит серверное приложение на основе [NestJS](https://nestjs.com/), представляющее из себя REST API для клиентского приложения [next-antitail](https://github.com/mkstas/next-antitail).

## Функционал ✨

- Вход с помощью номера мобильного телефона
- Создание и редактирование учебных дисциплин
- Создание и редактирование типов работ
- Создание и редактирование учебных работ

  - Ввод названия работы
  - Выбор дня сдачи работы
  - Выбор учебной дисциплины
  - Выбор типа работы
  - Заполнения описания (опционально)

- Создание подзадач для учебных работ

  - Ввод подзадачи
  - Выполнение и удаление

- Фильтрация учебных работ по дисциплинам и типам

## Установка и запуск 🛠️

### Установка

```bash
$ npm install
```

### Запуск в режиме разработки

```bash
# Запуск приложения
$ npm run start:dev

# Запуск СУБД
$ docker-compose up -d --build postgres
```

### Сборка и запуск Docker образа

```bash
$ docker-compoose up -d --build
```
