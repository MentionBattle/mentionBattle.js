# MentionBattle.js

## Как собрать?

Надо иметь установленную Node.js 5+ версии.
Проверить версию Node.js
```{shell}
$ node -v
v5.1.1
```

Далее необходимо установить зависимости
```{shell}
$ npm install
```

Сборка фронтэнда происходит командой gulp.

```{shell}
$ gulp
```

Собранный фронтэнд появится в папке dist.

## Конфигурация вебсокета
В папке app присутствует файл config.json, который конфигурирует endpoint для вебсокета.

Дефолтный конфиг выглядит так.
```{json}
{
  "webSocketConfig": {
    "host": "localhost",
    "port": 80,
    "endpoint": "mentionbattle"
  }
}
```
В итоге вебсокет пытается подключиться к ws://localhost:80/mentionbattle
