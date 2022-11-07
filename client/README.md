# Frontend
The client, or frontend, is a react app that interacts via a REST API with the PHP backend. The client only serves the purpose of displaying and retrieving the data from the user and does no real "work".
To build run:

 `npm run build`

... then copy the "build" folders content onto your webserver where your domains has their root. eg.:

`https://[FCA_FORK_DOMAIN]/index.html`

**PLEASE NOTE: Do not use fcAuth without SSL certificate because of the major security risk. USE AT YOUR OWN RISK!**

## Configuration
Before you build look up the settings.js file for the settings.

## URI Prams
fcAuth gets the redirection URL via the 'url' get parameter and returns the token via the 'token' get parameter. eg.:

`https://[FCA_FORK_DOMAIN]?url=[REDIRECT URL]`

[REDIRECT URL] must follow this pattern:

`https://[ADDRESS]/[FILENAME].php`

because fcAuth will append the returning token like this:

`[REDIRECT URL]?token=[TOKEN]`
