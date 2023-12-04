# API

This document details the endpoints that this frontend communicates with in order to transmit and store data. The API is structured in a way that allows any server could be used, so long as it hosts these endpoints and provides the following interfaces.

> **Terminology**
>
> -  Request: a JSON object that is sent _from_ the frontend (this repo) _to_ a server.
> -  Response: a JSON object that is sent _to_ the frontend (this repo) _from_ a server.
> -  `:uid`: a dynamic part of a route, where a unique identifier is represented (such as the ID of a file).

## Backend

The following endpoints are hosted by the server `process.env.BACKEND_URL`: a server address set as an environment variable in the file `.env.local` in the root directory of this repo.

_**Note: all non-auth endpoints require a `same-site`, `http-only` JWT cookie that is set by the server hosting these endpoints, on authentication.**_

### `/auth/register` : `POST`

Sends an email to the user, with a link to `/auth/register/:uid` (where `uid` is an encoded version of their email address) for them to create an account.

#### Request

```json
{
	"email": "string"
}
```

### `/auth/register/:uid` : `POST`

Creates a user, and sets a `same-site`, `http-only` JWT cookie.

#### Request

```json
{
	"username": "string",
	"email": "string",
	"password": "string"
}
```

### `/auth/login` : `POST`

Authenticates a user, and sets a `same-site`, `http-only` JWT cookie.

#### Request

```json
{
	"email": "string",
	"password": "string"
}
```

### `/store/docs` : `GET`

Retrieves all docs for the authenticated user.

#### Response

```json
{
	"status": "number",
	"message": "string",
	"files": [
		{
			"_id": "string",
			"title": "string",
			"body": "Object[]",
			"created": "Date",
			"modified": "Date"
		}
	]
}
```

### `/store/docs/:uid` : `GET`

Retrieves a specific doc for the authenticated user.

#### Response

```json
{
	"status": "number",
	"message": "string",
	"file": {
		"_id": "string",
		"title": "string",
		"body": "Object[]",
		"created": "Date",
		"modified": "Date"
	}
}
```

### `/store/docs` : `POST`

Creates a new doc for the authenticated user.

#### Request

```json
{
	"file": {
		"title": "string",
		"body": "Object[]"
	}
}
```

#### Response

```json
{
	"status": "number",
	"message": "string",
	"file": {
		"_id": "string",
		"title": "string",
		"body": "Object[]",
		"created": "Date",
		"modified": "Date"
	}
}
```

### `/store/docs/:uid` : `PUT`

Updates a specific doc for the authenticated user.

#### Request

```json
{
	"file": {
		"title": "string",
		"body": "Object[]"
	}
}
```

#### Response

```json
{
	"status": "number",
	"message": "string",
	"file": {
		"_id": "string",
		"title": "string",
		"body": "Object[]",
		"created": "Date",
		"modified": "Date"
	}
}
```

### `/store/docs/:uid` : `DELETE`

Removes a specific doc from the authenticated user.

#### Response

```json
{
	"status": "number",
	"message": "string",
	"file": {
		"_id": "string",
		"title": "string",
		"body": "Object[]",
		"created": "Date",
		"modified": "Date"
	}
}
```
