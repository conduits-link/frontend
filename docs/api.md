# API

This document details the endpoints that this frontend communicates with in order to transmit and store data. The API is structured in a way that allows any server could be used, so long as it hosts these endpoints and provides the following interfaces.

> **Terminology**
>
> -  Request: a JSON object that is sent _from_ the frontend (this repo) _to_ a server.
> -  Response: a JSON object that is sent _to_ the frontend (this repo) _from_ a server.
> -  `:uid`: a dynamic part of a route, where a unique identifier is represented (such as the ID of a file).

## Backend

The following endpoints are hosted by the server `process.env.NEXT_PUBLIC_API_URL`: a server address set as an environment variable in the file `.env.local` in the root directory of this repo.

_**Note: all non-auth endpoints require a `same-site`, `http-only` JWT cookie that is set by the server hosting these endpoints, on authentication.**_

### `/auth/register` : `POST`

Sends an email to the user, with a link to `/auth/register/:uid` (where `uid` is an encoded version of their email address) for them to create an account.

#### Request

```json
{
	"email": "string"
}
```

#### Response

```json
{
	"status": "number",
	"message": "string",
	"data": {
		"user": {
			"email": "string"
		}
	}
}
```

### `/auth/register/:uid` : `POST`

Creates a user, and creates a JWT with the user's email address as the payload.

> **Note about the JWT**
>
> The JWT must be set as a cookie with the following attributes:
>
> -  `same-site` : `strict`
> -  `secure` : `true`
> -  `http-only` : `true`
> -  `domain` : `process.env.NEXT_PUBLIC_API_URL` (the server address of this backend)

#### Request

```json
{
	"username": "string",
	"email": "string",
	"password": "string"
}
```

#### Response

```json
{
	"status": "number",
	"message": "string",
	"data": {
		"user": {
			"username": "string",
			"email": "string"
		}
	}
}
```

### `/auth/login` : `POST`

Authenticates a user, and creates a JWT with the user's email address as the payload.

> **Note about the JWT**
>
> The JWT must be set as a cookie with the following attributes:
>
> -  `same-site` : `strict`
> -  `secure` : `true`
> -  `http-only` : `true`
> -  `domain` : `process.env.NEXT_PUBLIC_API_URL` (the server address of this backend)

#### Request

```json
{
	"email": "string",
	"password": "string"
}
```

#### Response

```json
{
	"status": "number",
	"message": "string",
	"data": {
		"user": {
			"username": "string",
			"email": "string"
		}
	}
}
```

### `/store/docs` : `GET`

Retrieves all docs for the authenticated user.

#### Response

```json
{
	"status": "number",
	"message": "string",
	"data": {
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
}
```

### `/store/docs/:uid` : `GET`

Retrieves a specific doc for the authenticated user.

#### Response

```json
{
	"status": "number",
	"message": "string",
	"data": {
		"file": {
			"_id": "string",
			"title": "string",
			"body": "Object[]",
			"created": "Date",
			"modified": "Date"
		}
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
	"data": {
		"file": {
			"_id": "string",
			"title": "string",
			"body": "Object[]",
			"created": "Date",
			"modified": "Date"
		}
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
	"data": {
		"file": {
			"_id": "string",
			"title": "string",
			"body": "Object[]",
			"created": "Date",
			"modified": "Date"
		}
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
	"data": {
		"file": {
			"_id": "string",
			"title": "string",
			"body": "Object[]",
			"created": "Date",
			"modified": "Date"
		}
	}
}
```

### `/generate/text` : `POST`

Inferences a generative model to generate text, given a prompt.

#### Request

```json
{
	"promptName": "string",
	"messages": [
		{
			"role": "string",
			"content": "string"
		}
	]
}
```

#### Response

```json
{
	"status": "number",
	"message": "string",
	"data": {
		"promptName": "string",
		"messages": [
			{
				"role": "string",
				"content": "string"
			}
		]
	}
}
```
