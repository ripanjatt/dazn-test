# DAZN TEST

A simple backend for a Movie OTT application

## SETUP and RUNNING

To run the application, following applications should be available:

- Docker compose
- Node.js

In the terminal simply use the following commands:

```bash
# attached
sudo docker-compose up --build

# detached
sudo docker-compose up --build --detach
```

This will spin all the required containers for the application

## API documentation

_NOTE: The API collection can be found in `api-collection.json`_

### GET /movies

This API can be used to get all the movies available on the platform.

#### Response

```
[
  {
    "_id": "<movie id>",
    "title": "<movie title>",
    "genre": [
      "<genre>",
      "<genre>"
    ],
    "ratings": <ratings out of 5.0>
  }
]
```

#### cURL

```
curl  -X GET \
  'http://localhost:8081/movies/' \
  --header 'Accept: */*'
```

_NOTE: Can be improved by adding pagination_

### GET /movies/search?q={query}

Fetches all the movies that matches the query.
It will search in both title and genre. If any one of them contains the queried text, the movie will be returned.

#### Response

```
[
  {
    "_id": "<movie id>",
    "title": "<movie title>",
    "genre": [
      "<genre>",
      "<genre>"
    ],
    "ratings": <ratings out of 5.0>
  }
]
```

#### If not found

```
[] // empty array
```

#### cURL

```
curl  -X GET \
  'http://localhost:8081/movies/search?q=movie-name' \
  --header 'Accept: */*'
```

### POST /auth/generateToken

Used to create JWT for admin actions (CREATE, UPDATE, DELETE)

#### cURL

```
curl  -X POST \
  'http://localhost:8081/auth/generateToken' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "user": "<user>",
  "passKey": "<passKey>"
}'
```

_NOTE: The `user` and `passkey` can be found in the env files_

## ADMIN ACTIONS

### Error response if token is not provide (status 401)

```
{
  "message": "Unauthorized action!",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### POST /movies

Creates a new entry for a movie in the db.

#### Request

```
{
  "title": "<movie title>",
  "ratings": <ratings out of 5>,
  "genre": ["<genre>", "<genre>"],
  "cover": "<image url>",
  "streamingLink": "<url>",
  "description": "<movie description>"
}
```

| Key           | Required | Value                        |
| ------------- | -------- | ---------------------------- |
| title         | Yes      | string                       |
| ratings       | Yes      | number (0.0 <= value <= 5.0) |
| genre         | Yes      | Array\<string\>              |
| cover         | No       | string (Image URL)           |
| streamingLink | No       | string (URL)                 |
| description   | No       | string                       |

#### Response

```
{
  "status": "ADDED",
  "_id": "<movie id>"
}
```

#### Error Response (if Id not found)(status 200)

```
{
  "status": "FAILED",
  "error": "error message"
}
```

#### cURL

```
curl  -X POST \
  'http://localhost:8081/movies' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: <jwt-token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "title": "Hangover 1",
  "ratings": 5.0,
  "genre": ["Comedy"]
}'
```

### PUT /movies/:id

This API can be used to update any value of movie details like title, genre etc.

#### Request

| Key           | Required | Value                        |
| ------------- | -------- | ---------------------------- |
| title         | No       | string                       |
| ratings       | No       | number (0.0 <= value <= 5.0) |
| genre         | No       | Array\<string\>              |
| cover         | No       | string (Image URL)           |
| streamingLink | No       | string (URL)                 |
| description   | No       | string                       |

#### Response

```
{
  "status": "UPDATED",
  "_id": "<movie id>"
}
```

#### Error Response (if Id not found)(status 200)

```
{
  "status": "FAILED",
  "error": "error message"
}
```

#### cURL

```
curl  -X PUT \
  'http://localhost:8081/movies/:id' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: <jwt-token>' \
  --data-raw '{
  "ratings": 4.5,
  "genre": ["Comedy", "Travelling"]
}'
```

### DELETE /movies/:id

This API is used to delete an entry in the movie db.

#### cURL

```
curl  -X DELETE \
  'http://localhost:8081/movies/:id' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: <jwt-token>'
```

#### Error Response (if Id not found)(status 200)

```
{
  "status": "FAILED",
  "error": "error message"
}
```
