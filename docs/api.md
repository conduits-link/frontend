# API

This document lays out the API servers and endpoints that Noteworthy communicates with to transmit data between servers, data stores, and AI models.

The Noteworthy API is structured in a way that means any server could be used, so long as it hosts these endpoints and provides the following interfaces.

Terminology:

-  **Request**: a JSON object that is sent _from_ Noteworthy _to_ a server.
-  **Response**: a JSON object that is sent _to_ Noteworthy _from_ a server.
-  `:slug`: a dynamic part of a route, where a unique identifier is represented (such as the ID of a file)

## `NEXT_PUBLIC_BACKEND_URL`

The following endpoints are hosted by the server `NEXT_PUBLIC_BACKEND_URL`: an environment variable defined in `.env.local` in the root directory of Noteworthy.

### `/store` : `GET`

#### Response

`body`:

```json
{
	"message": <string>,
	"files": <array>[
		{
			"_id": <string>,
			"title": <string>,
			"created": <date>,
			"modified": <date>
		}
	]
}
```

### `/file` : `POST`

#### Response

`body`:

```json
{
	"message": <string>,
	"file": {
		"_id": <string>,
		"created": <date>,
		"modified": <date>
	}
}
```

### `/file/:slug` : `GET`

#### Response

`body`:

```json
{
	"message": <string>,
	"file": {
		"title": <string>,
		"body": <string>,
		"created": <date>,
		"modified": <date>
	}
}
```

### `/file/:slug` : `PATCH`

#### Request

`body`:

```json
{
	"file": {
		"title": <string>,
		"body": <string>
	}
}
```

#### Response

`body`:

```json
{
	"message": <string>,
	"file": {
		"title": <string>,
		"body": <string>,
		"created": <date>,
		"modified": <date>
	}
}
```

### `/file/:slug` : `DELETE`

#### Request

#### Response

`body`:

```json
{
	"message": <string>,
	"file": {
		"title": <string>,
		"body": <string>,
		"created": <date>,
		"modified": <date>
	}
}
```
