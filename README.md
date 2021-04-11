This is based on https://startbootstrap.com/theme/freelancer

NOTE:

Ensure that while committing to master, the URL is changed to PROD. The website is served from `main` branch. So if PROD url is given, then data will be stored in prod dynamo DB, else if DEV url is given, then data will be stored in dev dynamo DB.

For development/testing

1. Change the URL for form submission in assets/mail/contact_me.js to dev environment. When form submitted, form content is posted to corresponding dev environment lambdas
2. Run `python3 -m http.server` (on windows cmd line `py -3 -m http.server`)this will spin up a webserver and serve the folder content via http, so that we can post to API Gateway which is cors enabled.