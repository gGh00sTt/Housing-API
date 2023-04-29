# Housing-API
uses a postgres database running in a container and redis server for processing the jobs in queue (processing of uploaded housing data)
* Setup your computer with `docker` and `docker compose`
* Start using `docker compose up`

Swagger API documentation can be accessed at `http://localhost:8000/api-docs` . You can only do registration and login test through it. Other api functionalities are not accessible through it as they require JWT authentication obtained after successful login

