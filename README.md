### Как запустить приложение

## Сервер (2 способа)
# 1 способ (БД MongoDB (любой вариант, необходим только url подключения): локальная база, докер, mongo Atlas)
- "client-server-car-list" -> "server" -> "src"
  - npm i
  - Переименовать .env.example в .env, и в файле заменить MONGO_URL на url подключения
  - npm run build
  - npm start
# 2 способ с помощью Docker
- "client-server-car-list" -> "server" -> "src"
  - docker-compose up --build -d

## Клиент
- "client-server-car-list" -> "client"
  - npm i
  - Переименовать .env.example в .env
  - npm run build
  - npm start
  
### Работать с backend можно как из приложения client так и самостоятельными запросами (через Postman, терминал curl итд)


  