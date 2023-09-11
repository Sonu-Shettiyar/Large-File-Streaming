# File Upload and Download API Documentation

This documentation explains how to use the Node.js backend code to implement a file upload and download API using Express.js, Connect-Busboy, and MongoDB. The code provides endpoints for uploading and downloading files. The application runs on `localhost:8800`.

## Prerequisites

Before using this API, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (if you plan to use the database)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Change directory to the project folder:

   ```bash
   cd your-repo-name
   ```

3. Install the required Node.js modules:

   ```bash
   npm install
   ```

## Usage

### Uploading a File

1. Start the server:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:8800`.

3. You will see a file upload form. Select a file and click "Submit" to upload it.

4. The uploaded file will be saved in the specified `uploads` directory, and its details will be added to the MongoDB database.

### Downloading a File

To download a file, you can use the following endpoint:

- `GET http://localhost:8800/download/:id`

Replace `:id` with the MongoDB document ID of the file you want to download. The server will respond with the file as an attachment.

### Code Explanation

The code provided in `index.js` demonstrates how to use the `connect-busboy` middleware for file upload and how to serve files for download. Below are some key components of the code:

- **Uploading a File**:

  The `/upload` POST endpoint handles file uploads. It uses Connect-Busboy to parse the incoming file. The uploaded file is saved to the `uploads` directory, and its details are stored in the MongoDB database.

- **Downloading a File**:

  The `/download/:id` GET endpoint allows users to download files by providing the document ID as a parameter. It reads the file from the `uploads` directory and serves it as an attachment with the appropriate content type.

- **MongoDB Integration**:

  The code connects to a MongoDB database using Mongoose. You can configure the database connection URL in the code.

- **Form Interface**:

  The root endpoint `/` displays an HTML form for file uploads.
-----------------------------------
