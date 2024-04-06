# Conduit API

Currently, Conduit only has an internal API, which is what's used by this frontend for authentication, file storage, and machine learning model inferencing.

We plan to add an external, publicly-facing, API in the future, which will allow users to use the backend services without needing to use this frontend.

## Terminology

The following terms are used throughout the API documentation:

-  Request: a JSON object that is sent _from_ the frontend (this repo) _to_ a server.

-  Response: a JSON object that is sent _to_ the frontend (this repo) _from_ a server.

-  `:uid`: a dynamic part of a route, where a unique identifier is represented (such as the ID of a file).

## Internal API

All of the information about using, building, modifying, and deploying the internal API can be found in the [here](internal.md).
