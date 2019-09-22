## Using Docker

### Client
Reference: https://github.com/avatsaev/angular4-docker-example

```
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

Check [README.md](blob/master/server/README.md)

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
