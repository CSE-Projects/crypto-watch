# Crypto Watch (On Going)
Web app for tracking user's expenses, with features like resolving payments of people in a group, analysis of transactions, etc.

### Usage 
Checkout [USAGE.md](blob/master/USAGE.md)

### Docker Setup using Docker Compose
- Server, Client and MySQL server run on different containers
- MySQL server starts before server which starts before the client

### Project Structure
- `server`: contains Express server code with MySQL integration for the API's
- `client`: contains Angular code to use server API's and provide client interface 


### Future Work
* [ ] Integration with cryptocurrency payment services
* [ ] Orchestrate using Kubernetes
