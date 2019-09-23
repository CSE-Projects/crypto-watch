## Using Docker Compose


### Run independently using Docker

### Server
Assuming mysql server is up on port 3306 and access allowed with the username and password

```
cd server
docker build -t server .
docker run -d -p 3000:3000 --network host server
``` 

### Client
Reference: https://github.com/avatsaev/angular4-docker-example

```
cd client
docker build -t client . 
docker run -d -p 8080:80 client
```


## General
0. Installation Node.js and Npm
    ```
    sudo apt-get install nodejs npm
    ```
    
1. Clone the repo 
    ```
    git clone https://github.com/CSE-Projects/crypto-watch.git
    ```

### Server

- Check [README.md](server/README.md) for setting variables

- Assuming mysql server is up on port 3306 and access allowed with the username and password
    ```
    npm start
    ```

### Client

1. Move to the client folder 
    ```
    cd client
    ```
2. install dependencies 
    ```
    npm install
    ```
3. Run locally
    ```
    ng serve -o
    ```
    The client app can be accessed from http://localhost:4200
