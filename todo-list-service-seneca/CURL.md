Добавление
```shell
curl -X POST \
  http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{
        "description": "Новая задача Seneca"
}'
```

Удаление
```shell
curl -X DELETE http://localhost:3000/tasks/65e1d7407b2c7e04bfe4b963
```

Обновление
```shell
curl -X PUT \
  http://localhost:3000/tasks/65e1d7607b2c7e04bfe4b967 \
  -H 'Content-Type: application/json' \
  -d '{
      "description": "Новая задача"
}'
```