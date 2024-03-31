# Pages

This document details the web pages accessible when this project is run.

> **Note:**
>
> Please refer to the [README](../README.md) to ensure you have set up the project correctly before running it.

## Authentication

> **Note:**
>
> When running Conduit with the [built-in API](../README.md#run-with-built-in-api), no authentication is needed. Therefore, all of the authentication pages in this section are only required if an [external API](../README.md#run-with-external-api) is being used that requires authentication.

### `/register`

Users can submit their email address to receive a link to create an account.

### `/register/:uid`

Users can create an account with their email address and a password.

### `/login`

Users can log into their account with their email address and password.

### `/forgot`

Users can submit their email address to receive a link to reset their password.

### `/forgot/:uid`

Users can reset their current password with a new password.

## Documents

### `/store`

Users can manage their documents.

### `/edit/:uid`

Users can view and edit a specific document.
