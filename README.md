## Как запустить приложение

- "client-server-car-list" -> "server"
  - npm i
  - БД MongoDB (любой вариант, необходим только url подключения): локальная база, докер, mongo Atlas
  - Переименовать .env.example в .env, и в файле заменить MONGO_URL на url подключения
  - npm run build
  - npm start

- "client-server-car-list" -> "client"
  - npm i
  - Переименовать .env.example в .env
  - npm run build
  - npm start
  
### Работать с backend можно как из приложения client так и самостоятельными запросами (через Postman, терминал curl итд)


  