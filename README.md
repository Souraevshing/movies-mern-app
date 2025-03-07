# MERN Movies App

## 📌 Project Overview

MERN Movies App is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to browse, search, and manage movies efficiently.

---

## 📂 Project Structure

```dir
movies-mern/
│── client/       # Frontend (React, Vite)
│── server/       # Backend (Node.js, Express, MongoDB, Bcrypt, Nodemon,)
│── .env          # Environment variables (server)
│── package.json  # Project dependencies & scripts
│── README.md     # Documentation
```

---

## 🚀 Installation & Setup

### 1️⃣ **Clone the Repository**

```sh
https://github.com/Souraevshing/movies-mern-app
cd movies-mern-app/
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a **.env** file inside the `server/` directory with the following variables:

```sh
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT = 5000
MONGO_DB_URL=db_url
NODE_ENV=environment_configuration
```

### 4️⃣ **Run the App**

To start both the client & server:

```sh
npm start
```

This runs:

- **Frontend** (`client/`) on `http://localhost:5173`
- **Backend** (`server/`) on `http://localhost:5000`

Alternatively, you can run them separately:

```sh
npm run client  # Start React frontend
npm run server  # Start Node.js backend
```

---

## 📜 Available Scripts

| Script         | Description                      |
|---------------|----------------------------------|
| `npm start`   | Start both client & server      |
| `npm run client` | Run frontend (React)         |
| `npm run server` | Run backend (Node.js, Express) |
| `npm test`    | Run tests (if configured)       |

---

## 🔧 Technologies Used

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** React Context API / Redux (if implemented)

---

## 📌 Features

✔️ User Authentication (Login/Register)  
✔️ Search & Filter Movies  
✔️ View Movie Details  
✔️ Add, Edit, and Delete Movies (Admin)  
✔️ Responsive UI

---

## 🌍 Deployment

To deploy the application:

1. **Frontend:** Deploy on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
2. **Backend:** Deploy on [Render](https://render.com/) or [Heroku](https://www.heroku.com/).
3. **Database:** Use [MongoDB Atlas](https://www.mongodb.com/atlas/database) for cloud storage.

---

## 🛠 Future Enhancements

- 🎨 Improved UI & animations
- 📽️ Movie Recommendations
- 🌟 User Ratings & Reviews

---

## 🤝 Contributing

Contributions are welcome! Feel free to **fork** the repo, make improvements, and submit a **pull request**.

---

## 📄 License

This project is licensed under the **MIT License**.

---

### 👨‍💻 Developed By: **Sourav**
