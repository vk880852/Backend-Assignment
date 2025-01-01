To-Do API
This is a simple To-Do API built using Node.js, Express, and MongoDB. The API allows users to manage their to-do lists with features for creating, reading, updating, and deleting tasks. It also includes user authentication using JWT (JSON Web Tokens) to secure routes.

✨ Features
🔒 Authentication: Users can register and log in to manage their tasks securely.
✅ Task Management: Users can create, read, update, and delete their tasks.
🔐 JWT Authentication: Protected routes require a valid token for access.
📋 Prerequisites
Before running the project, ensure the following are installed on your system:

Node.js (version >=14)
npm (Node Package Manager)
🚀 Setup Instructions
🗂 If You Have a Compressed Folder
📂 Unzip the Folder
If the project folder is in a compressed file, unzip it.

🖥 Open the Terminal
Navigate to the project's root directory using your terminal.

📦 Install Dependencies
Run the following command to install all necessary dependencies:

bash
Copy code
npm install
📄 Add the .env File
Create a .env file in the project root and add the necessary environment variables (e.g., MongoDB connection string, JWT secret).

▶️ Start the Server
Start the server by running:

bash
Copy code
npm run start

📘 **Notes**
**if .env file is present**
The .env file is crucial for configuration. Ensure it includes sensitive information such as:
MONGODB_URI=
DB_NAME=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
PORT=8080🚀


**🛠 If You Prefer to Clone the Repository**
🔗 Clone the Repository
Use the following command to clone the repository to your local machine:

bash
Copy code
git clone https://github.com/vk880852/Backend-Assignment.git
📂 Navigate to the Project Directory
Move into the newly cloned directory:

bash
Copy code
cd Backend-Assignment
📦 Install Dependencies
Run the following command to install all necessary dependencies:
bash
Copy code
npm install

📄 Add the .env File
Create a .env file in the project root and configure it with the required environment variables.

▶️ Start the Server
Start the server by running:
npm run start


📘 **Notes**
The .env file is crucial for configuration. Ensure it includes sensitive information such as:
MONGODB_URI=
DB_NAME=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
PORT=8080🚀