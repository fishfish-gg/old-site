---
title: API Docs
description: Documentation for the FishFish API
sidebarDepth: 2
---

# API Docs

The current base URL for all requests is:

`https://api.fishfish.gg/v1/`

## Authentication

Some routes in the API require an authentication token. This token should be provided in the `Authorization` header. Currently any authenticated route will only be used internally within the organisation. It is documented publicly but not intended to be used by the public directly.

---

## Domains

### `GET /domains`

Get a list of domains for a specific category.

Query parameters:

| Name     | Type   | Default  | Description                                                      |
|----------|--------|----------|------------------------------------------------------------------|
| category | string | phishing | The category of domains to fetch. See [Categories](#categories). |
| recent   | bool   | false    | Whether to only return domains added within the last hour.       |

Returns: A list of strings.

### `POST /domains`

Add a domain to the API. This is an authenticated route.

Request:

| Name     | Required | Type   | Default    | Description                                                          |
|----------|----------|--------|------------|----------------------------------------------------------------------|
| domain   | yes      | string | -          | The domain to add.                                                   |
| category | no       | string | "phishing" | The category of the domain.                                          |
| apex     | no       | bool   | false      | Whether all subdomains of the apex fall under the category provided. |

Returns: A [Domain](#domain) object with `meta` set to null.

### `GET /domains/:domain`

Get information about a specific domain.

Query parameters:

| Name     | Type | Default | Description                              |
|----------|------|---------|------------------------------------------|
| detailed | bool | false   | Include domain metadata in the response. |

Returns: A [Domain](#domain) object with `meta` set if `detailed` is `true`.

### `PATCH /domains/:domain`

Update a domain. This is an authenticated route.

Request:

| Name     | Required | Type   | Default | Description                                                    |
|----------|----------|--------|---------|----------------------------------------------------------------|
| category | no       | string | -       | The new category of the domain. See [Categories](#categories). |

Returns: A [Domain](#domain) object with `meta` set to null.

### `PATCH /domains/:domain/metadata`

Update a domain's metadata. This is an authenticated route.

Request: A [DomainMetadata](#domainmetadata) object.

Returns: A [DomainMetadata](#domainmetadata) object.

### `DELETE /domains/:domain`

Delete a domain from the API. This is an authenticated route.

## URLs

NOTE: All URLs with a `:url` parameter should have the provided URL given as a URL encoded string.

### `GET /urls`

Get a list of URLs for a specific category.

Query parameters:

| Name     | Type   | Default  | Description                                                   |
|----------|--------|----------|---------------------------------------------------------------|
| category | string | phishing | The category of urls to fetch. See [Categories](#categories). |
| recent   | bool   | false    | Whether to only return urls added within the last hour.       |

### `POST /urls`

Add a URL to the API. This is an authenticated route.

Request:

| Name     | Required | Type   | Default    | Description              |
|----------|----------|--------|------------|--------------------------|
| url      | yes      | string | -          | The url to add.          |
| category | no       | string | "phishing" | The category of the url. |

### `GET /urls/:url`

Get information about a specific URL.

Query parameters:

| Name     | Type | Default | Description                           |
|----------|------|---------|---------------------------------------|
| detailed | bool | false   | Include URL metadata in the response. |

Returns: A [URL](#url) object with `meta` set if `detailed` is `true`.

### `PATCH /urls/:url`

Update a URL. This is an authenticated route.

Request:

| Name     | Required | Type   | Default | Description                                                 |
|----------|----------|--------|---------|-------------------------------------------------------------|
| category | no       | string | -       | The new category of the url. See [Categories](#categories). |

Returbns: A [URL](#url) object with `meta` set to null.

### `PATCH /urls/:url/metadata`

Update a URL's metadata. This is an authenticated route.

Request: A [URLMetadata](#urlmetadata) object.

Returns: A [URLMetadata](#urlmetadata) object.

### `DELETE /urls/:url`

Delete a URL from the API. This is an authenticated route.

---

## Types

### Categories

- `phishing`
- `safe`
- `malware`

### Domain

| Name     | Type                               | Description                                                          |
|----------|------------------------------------|----------------------------------------------------------------------|
| domain   | string                             | The domain name.                                                     |
| category | string                             | The domain category.                                                 |
| apex     | bool                               | Whether all subdomains of the apex fall under the category provided. |
| meta     | [DomainMetadata](#domainmetadata)? | Optional metadata associated with the domain.                        |

### DomainMetadata

| Name    | Type    | Description                                                             |
|---------|---------|-------------------------------------------------------------------------|
| path    | string? | The path a domain was detected with.                                    |
| urlscan | string? | The URLScan detection result URL for the domain.                        |
| active  | string? | When the domain was last confirmed to be active as an ISO8601 datetime. |
| target  | string? | The target of a phishing domain.                                        |

### URL

| Name     | Type                         | Description                                |
|----------|------------------------------|--------------------------------------------|
| url      | string                       | The URL.                                   |
| category | string                       | The URL category.                          |
| meta     | [URLMetadata](#urlmetadata)? | Optional metadata associated with the URL. |

### URLMetadata

| Name    | Type    | Description                                                          |
|---------|---------|----------------------------------------------------------------------|
| urlscan | string? | The URLScan detection result URL for the url.                        |
| active  | string? | When the URL was last confirmed to be active as an ISO8601 datetime. |
| target  | string? | The target of a phishing URL.                                        |
