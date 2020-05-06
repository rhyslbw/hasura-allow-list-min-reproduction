See [issue](https://github.com/hasura/graphql-engine/issues/4687)
## Expected 
```
$ yarn start

{
  "data": {
    "foo": [
      {
        "id": 1
      },
      {
        "id": 2
      },
      {
        "id": 3
      }
    ]
  }
}
{
  "errors": [
    {
      "extensions": {
        "path": "$",
        "code": "validation-failed"
      },
      "message": "query is not allowed"
    }
  ]
}
```
## Actual
```

$ docker-compose up -d
$ yarn start

{
  "errors": [
    {
      "extensions": {
        "path": "$",
        "code": "validation-failed"
      },
      "message": "query is not allowed"
    }
  ]
}
{
  "errors": [
    {
      "extensions": {
        "path": "$",
        "code": "validation-failed"
      },
      "message": "query is not allowed"
    }
  ]
}
```
