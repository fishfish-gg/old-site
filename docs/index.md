---
home: true
title: Home
heroText: FishFish
tagline: A volunteer cybersecurity project focused on providing resources and services that improve safety across Discord.
actions:
  - text: API Docs
    link: /api
    type: primary
footer: Copyright (c) 2022 FishFish team. All rights reserved.
---

# About

FishFish is a volunteer cybersecurity project focused on providing resources and services that improve safety across Discord.

## Contact

- Email: [admin@fishfish.gg](mailto:admin@fishfish.gg)
- GitHub: <https://github.com/fishfish-gg>

<!-- - Postman: <https://postman.com/fishfish> -->

## API

::: tip
Coming soon!
:::

FishFish is home to an API allowing easy access to our phishing-domain database.
API documentation can be found [here](/api).

Features:

- Early detection of phish domains, _before_ they're used to harm your community.
- Ability to fetch whole database or compare a domain against known phishing domains.
- "Recent updates" endpoint at `/recent` for updating database mirrors without the need to poll `/all`.
- WebSocket feed for services that want to receive live database updates.
- High rate limit (see API docs)
