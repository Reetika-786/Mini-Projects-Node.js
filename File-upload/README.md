File Upload Example with Node.js, Express & Multer

This is a basic Node.js + Express project that demonstrates how to upload files from an HTML form using the Multer middleware.

**Features**

Simple homepage with a file upload form (homepage.ejs).

Uses Multer to handle file uploads.

Uploaded files are stored inside an uploads/ folder with a unique filename (timestamp + original filename).

Basic logging of request body and uploaded file details.

Redirects back to the homepage after uploading.


📂 Project Structure
project-folder/
│── index.js           # Main server file
│── views/
│   └── homepage.ejs   # Frontend form for file upload
│── uploads/           # Uploaded files will be stored here (auto-created)
│── package.json



**⚙️ Setup Instructions**

Clone or create project

git clone <repo-url>
cd project-folder


Install dependencies

npm install express multer ejs


Run the server

node index.js


Open in browser

http://localhost:8000/

**📝 How it Works**
1. index.js

Sets up an Express server.

Configures Multer storage:

Destination: ./uploads folder.

Filename: Date.now() + original file name (to avoid conflicts).

**Defines routes:**

GET / → renders homepage.ejs.

POST /upload → handles file upload (profileImage field).

Logs request body and uploaded file info.

Redirects back to /.

2. homepage.ejs

Contains a simple HTML form:

Method: POST

Action: /upload

Enctype: multipart/form-data (required for file uploads)

Input: file (named profileImage to match Multer config)

**✅ Example Workflow**

Open http://localhost:8000/.

Choose a file and click Upload.

File is stored inside uploads/ with a new name.

Console logs request + file details.

Redirects back to homepage.

**📸 Demo Flow**

User selects a file → Submits form → File saved in uploads/ → Redirected home.

**🔮 Future Enhancements**

Add multiple file uploads (upload.array()).

Show list of uploaded files on homepage.

Validate file types (images, pdfs, etc.).

Limit file size.
