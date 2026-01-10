# 🎬 CinemaHub – AI Movie Recommendation Platform

CinemaHub is a **Movie streaming and recommendation platform** powered by **Artificial Intelligence (Content-Based Filtering)**.  
The project recommends movies based on **genres and movie overviews**, allowing users to explore similar movies seamlessly while watching trailers directly from YouTube.

This project is built using **React + Vite + Tailwind CSS** for the frontend and **FastAPI + Machine Learning (TF-IDF & Cosine Similarity)** for the backend.

---

## 📌 Introduction

With the rapid growth of online streaming platforms, users often struggle to discover movies that match their interests.  
**CinemaHub** solves this problem by providing an **AI-powered movie recommendation system** that suggests similar movies based on content similarity.

The platform delivers:
- A modern **YouTube-like UI**
- Real-time **movie recommendations**
- Integrated **YouTube trailer playback**
- Fast and scalable backend using **FastAPI**

---

## 🎯 Objectives

The main objectives of this project are:

- ✅ To build an **AI-based movie recommendation system**
- ✅ To provide a **modern, responsive streaming UI**
- ✅ To implement **content-based filtering** using Machine Learning
- ✅ To allow users to **search and explore movies easily**
- ✅ To integrate **YouTube trailers** for an immersive experience
- ✅ To demonstrate full-stack development skills (Frontend + Backend + ML)

---

## 🔍 Scope of the Project

The scope of CinemaHub includes:

- 📽️ Displaying a list of movies with posters and details
- 🤖 Recommending similar movies using AI algorithms
- 🔎 Searching movies by title
- ▶️ Playing movie trailers using YouTube embed
- 📊 Handling movie data from CSV (scalable to database later)
- 🌐 Frontend-backend communication via REST API

**Future Enhancements (Scope Expansion):**
- User authentication & watch history
- Collaborative filtering
- Personalized recommendations
- Database integration (MongoDB / PostgreSQL)
- Deployment on cloud platforms

---

## 🛠️ Tools & Technologies Used

### 🔹 Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Icons

### 🔹 Backend
- FastAPI
- Python
- Uvicorn
- CORS Middleware

### 🔹 Machine Learning
- Pandas
- NumPy
- Scikit-learn
- TF-IDF Vectorizer
- Cosine Similarity

### 🔹 Data
- CSV Dataset (movies.csv)

### 🔹 Development Tools
- VS Code
- Git & GitHub
- Postman (API testing)

---

## 🚀 Applications

CinemaHub can be used in:

- 🎥 Online movie recommendation platforms
- 🎓 Educational projects (AI / ML / Full Stack)
- 🧪 Machine learning demonstrations
- 💼 Portfolio projects for software engineers
- 📊 Research on recommendation systems

---

## 🧠 How Recommendation Works

The recommendation engine uses **Content-Based Filtering**:

1. Combines movie **genres + overview**
2. Converts text into vectors using **TF-IDF**
3. Calculates similarity using **Cosine Similarity**
4. Recommends the most similar movies to the selected one

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/movies` | Fetch all movies |
| GET | `/movies/{title}` | Get movie by title |
| GET | `/recommend/{title}` | Get AI recommendations |
| GET | `/search/{query}` | Search movies |
| GET | `/health` | API health check |

---

## 🧑‍💻 Project Author

**Ramanand Mandal**  
🎓 BSc. CSIT Student  
💡 Aspiring Software Engineer  

---

## 📬 Contact & Social Media

You can reach out to me through the following platforms:

- 🔗 **LinkedIn:**  
  https://www.linkedin.com/in/ramanand-mandal-24a124324/

- 📘 **Facebook:**  
  https://www.facebook.com/ramanand.mandal.np

- 📸 **Instagram:**  
  https://www.instagram.com/maybe_razu/

- 📧 **Email:**  
  contact@ramanandmandal.com.np

- 📱 **WhatsApp:**  
  +977-9829704557

---

## 📜 License

This project is created for **educational and learning purposes**.  
Feel free to fork, modify, and enhance it.

---

⭐ If you like this project, don’t forget to **star the repository**!
