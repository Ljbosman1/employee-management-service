Employee Management Service
## Local setup
On your terminal, simply do `docker-compose up --build`, and wait for the containers to build. Eventually, you'll be able to see the index page by going to `[http://127.0.0.1/](http://127.0.0.1/)`.
## Pre-requisites 
```
docker-compose
npm (for tests only)
```
## Test coverage
To run the backend tests, check your test coverage, and generate a coverage report:

```
docker-compose run --rm django pytest
```
To run the frontend tests, navigate to the frontend folder and run the following:

```
npm test
```
