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


“API Endpoints ------------- ### User API * **Create User**: * **Endpoint**: `POST /api/v1/user` * **Description**: Registers a new user. * **Login User**: * **Endpoint**: `POST /api/v1/login` * **Description**: Authenticates a user and returns a JWT token. * **Update User**: * **Endpoint**: `POST /api/v1/user/:userId` * **Description**: Updates user information. Requires authentication. ### Station API * **Create Station**: * **Endpoint**: `POST /api/v1/station` * **Description**: Creates a new station. * **Get All Stations**: * **Endpoint**: `GET /api/v1/station` * **Description**: Retrieves a list of all stations. * **Get Specific Station**: * **Endpoint**: `GET /api/v1/station/:stationId` * **Description**: Retrieves information for a specific station. * **Update Station**: * **Endpoint**: `PUT /api/v1/station/:stationId` * **Description**: Updates information for a specific station. ### Train API * **Create Train**: * **Endpoint**: `POST /api/v1/train` * **Description**: Creates a new train schedule. * **Get All Trains**: * **Endpoint**: `GET /api/v1/train` * **Description**: Retrieves a list of all trains. * **Get Specific Train**: * **Endpoint**: `GET /api/v1/train/:trainId` * **Description**: Retrieves information for a specific train. * **Update Train**: * **Endpoint**: `PUT /api/v1/train/:trainId` * **Description**: Updates information for a specific train. ### Wallet API * **Add Funds**: * **Endpoint**: `POST /api/v1/wallet` * **Description**: Adds funds to a user's wallet. * **Get All Wallet Funds**: * **Endpoint**: `GET /api/v1/wallet/fund` * **Description**: Retrieves all wallet funds. * **Get User Wallet**: * **Endpoint**: `GET /api/v1/wallet` * **Description**: Retrieves wallet information for a specific user. ### Ticket API * **Purchase Ticket**: * **Endpoint**: `POST /api/v1/ticket` * **Description**: Purchases a ticket. * **Get All Tickets**: * **Endpoint**: `GET /api/v1/ticket` * **Description**: Retrieves a list of all tickets.”


