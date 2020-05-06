
See [issue](https://github.com/hasura/graphql-engine/issues/4687) for context.

This [query](https://github.com/rhyslbw/hasura-allow-list-min-reproduction/blob/master/operations/allowed.graphql) is 
[allowed in the metadata](https://github.com/rhyslbw/hasura-allow-list-min-reproduction/blob/master/hasura-migrations/metadata.json#L25-L33) 
snapshot, [mounted](https://github.com/rhyslbw/hasura-allow-list-min-reproduction/blob/master/docker-compose.yml#L20) at container runtime. 
Both the allowed and another query are [run](https://github.com/rhyslbw/hasura-allow-list-min-reproduction/blob/master/index.js#L23-L24) by the start script.

## Expected Result
```
$ npm start

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
$ npm start

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

# Run
```
npm i
docker-compose up -d
npm start
docker-compose down
```