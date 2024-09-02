# Train Service Management System

## Project Overview

The Train Service Management System is a backend application developed with Node.js, Express.js, and MongoDB. This system includes features for user management, station management, train scheduling, wallet integration, and a ticketing system.

## Project Setup

### 1. Initialize the Project

To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>

2.Navigate into the project directory:
cd <project-directory>

3.Install the required dependencies:
npm install
4. add environvent varibale on .env file
PORT= your_port
MONGO_URI = your_mongodb_url
SECRET_KEY = your_secret_key

5. npm run dev


User API:
Create: http//:localhost:port_no/api/v1/user
Login: http//:localhost:port_no/api/v1/login
Update: http//:localhost:port_no/api/v1/user/:userId

Station API:
Create: http//:localhost:port_no/api/v1/station
All Station: http//:localhost:port_no/api/v1/station
Get Specific Station: http//:localhost:port_no/api/v1/station/:stationId
Update: http//:localhost:port_no/api/v1/station/:stationId

Train API:
Create: http//:localhost:port_no/api/v1/train
All Station: http//:localhost:port_no/api/v1/train
Get Specific train: http//:localhost:port_no/api/v1/train/:trainId
Update: http//:localhost:port_no/api/v1/train/:trainId


Wallet API:
ADD: http//:localhost:port_no/api/v1/wallet
All Fund: http//:localhost:port_no/api/v1/wallet/fund
Get Specific user wallets: http//:localhost:port_no/api/v1/wallet

Ticket API:
Purchase: http//:localhost:port_no/api/v1/ticket
All: http//:localhost:port_no/api/v1/ticket


