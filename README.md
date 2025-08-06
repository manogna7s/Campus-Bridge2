
# Campus Bridge – Learning Management System (LMS) 📚

Campus Bridge is a modern and lightweight LMS (Learning Management System) tailored for educational institutions, students, and self-paced learners. Built with simplicity, scalability, and beauty in mind.

<p align="center">
  <img src="logo.png" alt="Campus Bridge Logo" height="60%" width="60%"/>
</p>

---

## 🚀 Live Demo

🌐 [Demo Link](https://campus-bridge-five.vercel.app/)

---

## 🧰 Tech Stack

| Layer       | Tech Used                    |
|------------|------------------------------|
| Frontend   | HTML, CSS, Bootstrap Icons, JavaScript |
| Backend    | Node.js, Express.js           |
| Database   | MySQL                         |
| API Client | Postman (for testing)         |

---

## 🧱 Features

- 🗂 Upload and manage lecture PDFs
- 📄 Dynamic lecture card generation
- 🔗 Open lecture PDFs directly from browser
- 🧪 REST API support (Tested with Postman)
- ⚡ Smooth integration between frontend & backend
- ✨ Modern UI with responsive design
- 🧾 Organized by subject/topic

---

## 📁 Folder Structure

```bash
CampusBridge-LMS/
│
├── public/                   # Frontend files
│   ├── index.html         # Main UI page
│   ├── script.js             # Dynamic JS logic
│
├── uploads/                  # Uploaded PDF files
│
├── server.js                 # Main Express server
├── db.js                     # MySQL connection
└── README.md                 # You’re here!
```

---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/Codeunia/Campus-Bridge.git
cd Campus-Bridge
```

### 2. Install dependencies

```bash
npm install express mysql multer cors
```

### 3. Setup MySQL

Open MySQL Workbench or Terminal and run:

```sql
CREATE DATABASE lms;

USE lms;

CREATE TABLE learning_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL
);
```

### 4. Start the MySQL server

Make sure your local MySQL is running and matches your `db.js` config.

### 5. Start the Express server

```bash
node server.js
```

---

## 📬 API Usage (Postman)

### Upload PDF

`POST http://localhost:3000/upload`  
**Form-data**:
- `title` → Lecture Title (Text)
- `pdf` → Upload PDF file (File)

### Get All Resources

`GET http://localhost:3000/resources`

---

## 🌐 Visit in Browser

```
http://localhost:3000/lectures.html
```

---

## 🚀 Additions

- ✅ User login/signup
- ✅ Tag lectures by subject/branch
- ✅ YouTube integration
- ✅ Admin dashboard

---
## 🧠 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 🪪 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🧑‍💻 Author

Made with 🤍 by Manogna Samayam & Monika Gamakonda Kumar Raja.

> Let knowledge flow freely.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.