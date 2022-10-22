---
title: API Docs
description: Documentation for the FishFish API
sidebarDepth: 2
---

# API Docs

The current base URL for all requests is:

`https://api.fishfish.gg/v1/`

---

## Authentication

Some routes in the API require an authentication token. This token should be provided in the `Authorization` header.
<!-- Currently any authenticated route will only be used internally within the organisation.
It is documented publicly but not intended to be used by the public directly. -->

<!-- You can acquire an API token by joining our `[Discord server](https://discord.gg/________)`. -->

Internal endpoints are only accessible within the organization.
Nonetheless, these endpoints are documented at [/api-internal](/api-internal).

<!-- // TODO: explain main token/session token stuff -->


::: note
INTEGERS RETURNED BY THIS API SHOULD BE ASSUMED TO BE 64-BIT INTEGERS.
:::


### `POST /users/@me/tokens`

Create a session token to use for requests. This is an authenticated request.

**Returns:** [SessionToken](#sessiontoken)

::: note
This request should be authenticated with your *primary* token, not a session token.
This is the only endpoint that behaves this way.
:::


## Users

### `GET /users/@me`

Get your own user information. This is an authenticated request.

**Returns:** [User](#user)


## Domains

### `GET /domains`

Get a list of domains for a specific category.

**Query Parameters:**

| Name     | Type   | Default  | Description                                                      |
|----------|--------|----------|------------------------------------------------------------------|
| category | string | phishing | The category of domains to fetch. See [Categories](#categories). |
| recent   | bool   | false    | Whether to only return domains added within the last hour.       |

**Returns:** The relevant domains as list of strings.

### `POST /domains`

Add a domain to the API. This is an authenticated route.

**Request:** [CreateDomainRequest](#createdomainrequest)

**Returns:** [Domain](#domain)

### `GET /domains/:domain`

Get information about a specific domain.

**Query Parameters:**

| Name     | Type | Default | Description                              |
|----------|------|---------|------------------------------------------|
| detailed | bool | false   | Include domain metadata in the response. |

**Returns:** A [Domain](#domain) object with `meta` set if `detailed` is `true`.

### `PUT /domains/:domain`

Update a domain. This is an authenticated route.

**Request:** [UpdateDomainRequest](#updatedomainrequest)

**Returns:** A [Domain](#domain) object with `meta` set to null.

### `DELETE /domains/:domain`

Delete a domain from the API. This is an authenticated route.


## URLs

NOTE: All URLs with a `:url` parameter should have the provided URL given as a URL encoded string.

### `GET /urls`

Get a list of URLs for a specific category.

**Query Parameters:**

| Name     | Type   | Default  | Description                                                   |
|----------|--------|----------|---------------------------------------------------------------|
| category | string | phishing | The category of urls to fetch. See [Categories](#categories). |
| recent   | bool   | false    | Whether to only return urls added within the last hour.       |

**Returns:** The relevant URLs as a list of strings.

### `POST /urls`

Add a URL to the API. This is an authenticated route.

**Request:** [CreateURLRequest](#createurlrequest)

### `GET /urls/:url`

Get information about a specific URL.

**Query Parameters:**

| Name     | Type | Default | Description                           |
|----------|------|---------|---------------------------------------|
| detailed | bool | false   | Include URL metadata in the response. |

**Returns:** [URL](#url)

### `PUT /urls/:url`

Update a URL. This is an authenticated route.

**Request:** [UpdateURLRequest](#updateurlrequest)

**Returns:** [URL](#url)

### `DELETE /urls/:url`

Delete a URL from the API. This is an authenticated route.


## Enums

### Category

- safe
- phishing
- malware

### Permission

- domains
- urls


## Request Types

### CreateTokenRequest

| Name         | Type                        | Description                                                   |
|--------------|-----------------------------|---------------------------------------------------------------|
| permissions? | [Permission](#permission)[] | Permissions to give the token, as an optional list of strings |

### CreateDomainRequest

| Name         | Type                  | Description                                                 |
|--------------|-----------------------|-------------------------------------------------------------|
| description  | string                |                                                             |
| category     | [Category](#category) | Domain category.                                            |
| target?      | string                | The company or website being impersonated, if there is one. |

### UpdateDomainRequest

| Name         | Type                  | Description                                                 |
|--------------|-----------------------|-------------------------------------------------------------|
| description? | string                |                                                             |
| category?    | [Category](#category) | Domain category.                                            |
| target?      | string                | The company or website being impersonated, if there is one. |

### CreateURLRequest

| Name         | Type                  | Description                                                 |
|--------------|-----------------------|-------------------------------------------------------------|
| description  | string                |                                                             |
| category     | [Category](#category) | URL category.                                               |
| target?      | string                | The company or website being impersonated, if there is one. |

### UpdateURLRequest

| Name         | Type                  | Description                                                 |
|--------------|-----------------------|-------------------------------------------------------------|
| description? | string                |                                                             |
| category?    | [Category](#category) | URL category.                                               |
| target?      | string                | The company or website being impersonated, if there is one. |


## Response Types

### SessionToken

| Name    | Type   | Description                         |
| --------|--------|-------------------------------------|
| token   | string | JWT session token.                  |
| expires | int    | Session token expiration timestamp. |

### User

| Name                | Type                        | Description                       |
|---------------------|-----------------------------|-----------------------------------|
| id                  | int                         | FishFish user ID.                 |
| username            | string                      | Username.                         |
| permissions         | [Permission](#permission)[] | User's permissions.               |
| external_service_id | string?                     | External service connection info. |

Note: Currently, as the only way to acquire a token is via our Discord server,
`external_service_id` will be your Discord user ID formatted as `discord:{id}`.

### Domain

<!-- 
| Name     | Type                               | Description                                                          |
|----------|------------------------------------|----------------------------------------------------------------------|
| domain   | string                             | The domain name.                                                     |
| category | string                             | The domain category.                                                 |
| apex     | bool                               | Whether all subdomains of the apex fall under the category provided. |
| meta     | [DomainMetadata](#domainmetadata)? | Optional metadata associated with the domain.                        |
-->

| Name        | Type                   | Description                                                          |
|-------------|------------------------|----------------------------------------------------------------------|
| name        | string                 | The domain name.                                                     |
| description | string                 |                                                                      |
| category    | [Category](#category)  | Domain category.                                                     |
| target?     | string                 | The company or website being impersonated, if there is one.          |
| added       | int                    | Unix timestamp indicating when the domain was added to the database. |
| checked     | int                    | Unix timestamp indicating when the domain was last checked.          |

<!-- 
### DomainMetadata

| Name    | Type    | Description                                                             |
|---------|---------|-------------------------------------------------------------------------|
| path    | string? | The path a domain was detected with.                                    |
| urlscan | string? | The URLScan detection result URL for the domain.                        |
| active  | string? | When the domain was last confirmed to be active as an ISO8601 datetime. |
| target  | string? | The target of a phishing domain.                                        |
-->

### URL

<!-- 
| Name     | Type                         | Description                                |
|----------|------------------------------|--------------------------------------------|
| url      | string                       | The URL.                                   |
| category | string                       | The URL category.                          |
| meta     | [URLMetadata](#urlmetadata)? | Optional metadata associated with the URL. |
 -->

| Name        | Type                   | Description                                                       |
|-------------|------------------------|-------------------------------------------------------------------|
| url         | string                 | The URL.                                                          |
| description | string                 |                                                                   |
| category    | [Category](#category)  | URL category.                                                     |
| target?     | string                 | The company or website being impersonated, if there is one.       |
| added       | int                    | Unix timestamp indicating when the url was added to the database. |
| checked     | int                    | Unix timestamp indicating when the url was last checked.          |

<!-->
### URLMetadata

| Name    | Type    | Description                                                          |
|---------|---------|----------------------------------------------------------------------|
| urlscan | string? | The URLScan detection result URL for the url.                        |
| active  | string? | When the URL was last confirmed to be active as an ISO8601 datetime. |
| target  | string? | The target of a phishing URL.                                        |
-->
