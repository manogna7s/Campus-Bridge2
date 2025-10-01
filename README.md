# Campus Bridge – Learning Management System (LMS) 📚

Campus Bridge is a modern and lightweight LMS (Learning Management System) tailored for educational institutions, students, and self-paced learners. Built with simplicity, scalability, and beauty in mind.

<p align="center">
  <img src="logo.png" alt="Campus Bridge Logo" height="60%" width="60%"/>
</p>

---

## 🚀 Live Demo

🌐 [Demo Link](https://campus-bridge-five.vercel.app/)

---

## ☁️ Deployment Options

### Render (Recommended for Full Application)
For a complete deployment with both frontend and backend functionality, we recommend Render which supports Node.js applications with database connectivity.

**Important**: Campus Bridge requires an external MySQL database.

### Free MySQL Hosting Options

If you're looking for completely free MySQL hosting options:

1. **FreeSQLDatabase.com** (Completely free)
   - No payment required
   - No SSL support
   - Database may sleep after inactivity
   - Limited resources
   - Setup guide: [FREESQLDATABASE_SETUP_GUIDE.md](FREESQLDATABASE_SETUP_GUIDE.md)

2. **PlanetScale** (Free tier with limitations)
   - Free with some limitations
   - SSL support
   - Good performance
   - Setup guide: [PLANETSCALE_SETUP_GUIDE.md](PLANETSCALE_SETUP_GUIDE.md)

3. **Railway** (Credit-based free option)
   - $5/month credit (usually sufficient for small apps)
   - Good performance
   - Setup guide: [RAILWAY_SETUP_GUIDE.md](RAILWAY_SETUP_GUIDE.md)

### FreeSQLDatabase.com Setup (Required for Render)
Before deploying to Render, you need to set up a MySQL database using FreeSQLDatabase.com:

1. Follow the guide in [FREESQLDATABASE_SETUP_GUIDE.md](FREESQLDATABASE_SETUP_GUIDE.md)
2. Get your database connection details
3. Use these details when configuring environment variables in Render

### Environment Variables
After setting up your MySQL database, configure these environment variables in Render:
- `MYSQL_HOST` - Your MySQL hostname
- `MYSQL_USER` - Your MySQL username
- `MYSQL_PASSWORD` - Your MySQL password
- `MYSQL_DATABASE` - Your database name
- `MYSQL_PORT` - 3306 (or your provider's port)
- `MYSQL_SSL` - Set to "false" only if using FreeSQLDatabase.com
- `EMAIL_SERVICE` - Gmail
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail app password
- `EMAIL_FROM` - Your Gmail address
- `APP_URL` - https://campus-bridge-lms.onrender.com

See [RENDER_ENV_VARIABLES.md](RENDER_ENV_VARIABLES.md) for detailed instructions.

### Deploying to Render with FreeSQLDatabase.com
If you're using FreeSQLDatabase.com, follow the specific deployment guide:
- [RENDER_DEPLOYMENT_WITH_FREESQL.md](RENDER_DEPLOYMENT_WITH_FREESQL.md)
- [RENDER_DEPLOYMENT_CHECKLIST_FREESQL.md](RENDER_DEPLOYMENT_CHECKLIST_FREESQL.md)

### Local Development (Recommended)
For the complete experience, run the application locally:

```bash
git clone https://github.com/Codeunia/Campus-Bridge.git
cd Campus-Bridge
npm install
npm start
```

After deployment, you can check your database status at `/db-status.html`

If you encounter database connection issues, see [DATABASE_TROUBLESHOOTING.md](DATABASE_TROUBLESHOOTING.md)

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
- 🔐 User authentication and session management
- 👤 User registration and login
- 🚫 Protected routes for authenticated users only
- 🤖 Shakthi Bot - AI assistant for website navigation

---

## 📁 Folder Structure

```bash
CampusBridge-LMS/
│
├── public/                   # Frontend files
│   ├── index.html         # Main UI page
│   ├── script.js             # Dynamic JS logic
│   ├── shakti-bot.js         # Shakthi Bot AI assistant
│   ├── *.html                # All HTML pages with integrated Shakthi Bot
│
├── uploads/                  # Uploaded PDF files
│
├── server.js                 # Main Express server
├── db.js                     # MySQL connection
├── middleware.js             # Authentication middleware
├── init-db.js                # Database initialization script
├── README.md                 # Project documentation
├── AUTHENTICATION_SETUP.md   # Authentication system documentation
├── GOOGLE_ANALYTICS_SETUP.md # Google Analytics implementation guide
└── SHAKTHI_BOT_GUIDE.md      # Comprehensive Shakthi Bot implementation guide
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

### 3. Setup MySQL Tables

Open MySQL Workbench or Terminal and run:

```sql
CREATE DATABASE lms;

USE lms;

CREATE TABLE learning_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user
INSERT INTO users (name, email, password) VALUES ('Test User', 'test@example.com', 'password123');
```

### 5. Start the MySQL server

Make sure your local MySQL is running and matches your `db.js` config.

### 6. Start the Express server

```bash
npm start
```

Or for development:

```bash
npm run dev
```

---

## 🔐 Authentication

Campus Bridge now includes a full authentication system with:

- User registration
- User login/logout
- Session management
- Protected routes

For detailed information about the authentication system, see [AUTHENTICATION_SETUP.md](AUTHENTICATION_SETUP.md).

### Default Test User

After running `npm run init-db`, a test user will be created:
- **Email**: test@example.com
- **Password**: password123

### Email Confirmation

Campus Bridge now sends email confirmations after successful user login. For setup instructions, see [EMAIL_CONFIRMATION_SETUP.md](EMAIL_CONFIRMATION_SETUP.md).

---

## 📬 API Usage (Postman)

### Upload PDF

`POST http://localhost:3000/upload`  
**Form-data**:
- `title` → Lecture Title (Text)
- `pdf` → Upload PDF file (File)

### Get All Resources

`GET http://localhost:3000/resources`

### User Registration

`POST http://localhost:3000/api/register`
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "userpassword"
}
```

### User Login

`POST http://localhost:3000/api/login`
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

---

## 🌐 Visit in Browser

```bash
http://localhost:8080/
```

---

## 🚀 Additions

- ✅ User login/signup
- ✅ Tag lectures by subject/branch
- ✅ YouTube integration
- ✅ Admin dashboard
- ✅ Protected routes
- ✅ Session management
- ✅ Shakthi Bot AI assistant
- ✅ Email confirmation after login

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