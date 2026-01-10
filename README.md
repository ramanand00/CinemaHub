# MovieStream - AI-Powered Movie Recommendation Platform 🎬

<div align="center">

![MovieStream Banner](https://via.placeholder.com/800x200/FF0000/FFFFFF?text=MovieStream+AI+Recommendation+Platform)

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)](https://python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**YouTube-style movie discovery with AI-powered recommendations**

[Live Demo](https://your-demo-link.com) · [Report Bug](https://github.com/yourusername/moviestream/issues) · [Request Feature](https://github.com/yourusername/moviestream/issues)

</div>

## 📖 Introduction

MovieStream is a modern, YouTube-style movie recommendation platform that combines content-based filtering with an intuitive user interface. The application provides personalized movie suggestions using AI/ML algorithms, offering users an immersive experience similar to popular streaming platforms. Discover your next favorite movie through intelligent recommendations based on your viewing preferences!

## 🎯 Objectives

- **🤖 Intelligent Recommendations**: Develop an advanced movie recommendation system using content-based filtering and TF-IDF vectorization
- **🎨 YouTube-Inspired UI**: Create a responsive, familiar interface that mimics YouTube's sleek design for seamless user experience
- **🔍 Real-Time Search**: Implement efficient search functionality with instant results and filtering
- **⚡ High Performance**: Build a scalable FastAPI backend with optimized response times
- **📱 Cross-Platform**: Ensure flawless experience across desktop, tablet, and mobile devices
- **🎬 Integrated Video Playback**: Provide smooth YouTube video integration with autoplay capabilities

## 📋 Scope

### **Frontend Features**
- 🎥 YouTube-style video player with embedded trailers
- 📺 Responsive movie grid with hover effects
- 🔄 Real-time recommendation updates
- 🎯 "Now Playing" indicator for active movies
- 📱 Mobile-responsive navigation
- 🎨 Dark theme with YouTube-inspired color scheme

### **Backend Capabilities**
- 🧠 Content-based recommendation engine
- 📊 TF-IDF vectorization with cosine similarity
- 🚀 FastAPI RESTful API endpoints
- 🔍 Efficient search algorithms
- 📈 Scalable architecture for large datasets

### **ML Model**
- **Algorithm**: Content-based filtering
- **Feature Extraction**: TF-IDF Vectorizer (5000 features)
- **Similarity Metric**: Cosine Similarity
- **Data Processing**: Genre + Overview combination

## 🛠️ Tools and Technologies

### **Frontend Stack**
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.x |
| **Vite** | Build Tool & Dev Server | 5.x |
| **Tailwind CSS** | Styling Framework | 3.4.x |
| **React Icons** | Icon Library | 4.x |
| **Axios** | HTTP Client | 1.x |

### **Backend Stack**
| Technology | Purpose | Version |
|------------|---------|---------|
| **FastAPI** | Web Framework | 0.104.x |
| **scikit-learn** | ML Library | 1.3.x |
| **pandas** | Data Manipulation | 2.1.x |
| **uvicorn** | ASGI Server | 0.24.x |
| **pydantic** | Data Validation | 2.5.x |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| **Git** | Version Control |
| **npm** | Package Manager |
| **Postman/Insomnia** | API Testing |
| **VS Code** | Code Editor |

## 💡 Applications

1. **🎬 Personal Entertainment Hub** - Personalized movie discovery platform for home entertainment
2. **🔍 Content Discovery Engine** - Intelligent system for finding similar movies based on preferences
3. **📚 Educational Tool** - Learn about recommendation algorithms and ML implementation
4. **💼 Portfolio Project** - Showcase full-stack development and ML integration skills
5. **🎓 Research Platform** - Study movie relationships, genres, and recommendation patterns

## 🚀 Installation Guide

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.9 or higher)
- npm or yarn
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/moviestream.git
cd moviestream

Set up backend environment

bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
Install Python dependencies

bash
pip install -r requirements.txt
Configure environment
Create a .env file in backend directory:

env
HOST=0.0.0.0
PORT=8000
DEBUG=true
DATA_PATH=data/movies.csv
Place your data file
Ensure movies.csv is in backend/data/ directory

Start backend server

bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
Frontend Setup
Navigate to frontend directory

bash
cd ../frontend
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Access the application

Frontend: http://localhost:5173

Backend API: http://localhost:8000

API Docs: http://localhost:8000/docs

Quick Start with Docker
bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individually
docker build -t moviestream-backend ./backend
docker build -t moviestream-frontend ./frontend
📁 Project Structure
text
moviestream/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieCard.jsx      # Individual movie card component
│   │   │   ├── MovieRow.jsx       # Horizontal movie scrolling row
│   │   │   ├── Navbar.jsx         # Navigation bar with search
│   │   │   └── VideoPlayer.jsx    # YouTube video player
│   │   ├── pages/
│   │   │   └── Home.jsx          # Main application page
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   └── styles/
│   │       └── index.css         # Global styles
│   ├── index.html                # HTML template
│   ├── package.json              # Dependencies
│   └── vite.config.js            # Build configuration
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── models.py         # Pydantic schemas
│   │   ├── database/
│   │   │   └── database.py       # Data access layer
│   │   └── recommender/
│   │       └── recommender.py    # ML recommendation engine
│   ├── data/
│   │   └── movies.csv            # Movie dataset
│   ├── requirements.txt          # Python dependencies
│   ├── main.py                  # FastAPI application
│   └── .env.example             # Environment template
│
└── README.md                    # Documentation
🌐 API Endpoints
Method	Endpoint	Description
GET	/	API root with documentation
GET	/movies	Get all movies
GET	/movies/{title}	Get specific movie by title
GET	/recommend/{title}	Get recommendations (top_n optional)
GET	/search/{query}	Search movies by title
GET	/health	Health check endpoint
Example Usage
bash
# Get all movies
curl http://localhost:8000/movies

# Get recommendations for "Inception"
curl "http://localhost:8000/recommend/Inception?top_n=5"

# Search for movies
curl http://localhost:8000/search/dark
🧪 Testing
Backend Tests
bash
cd backend
python -m pytest tests/
API Testing with curl
bash
# Health check
curl http://localhost:8000/health

# Get movie details
curl http://localhost:8000/movies/The%20Dark%20Knight
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Development Guidelines
Follow existing code style and conventions

Add comments for complex logic

Update documentation as needed

Write tests for new features

Ensure all tests pass before submitting PR

📞 Contact & Connect
<div align="center">
Ramanand Mandal
Connect with me on social media:

https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white
https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white
https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white
https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white

Email: contact@ramanandmandal.com.np
WhatsApp: +977 9829704557
Location: Nepal

</div>
📄 License
Distributed under the MIT License. See LICENSE file for more information.

🙏 Acknowledgments
Movie Data: The Movie Database (TMDB) for movie information

Video Hosting: YouTube for trailer hosting

Icons: React Icons library

UI Inspiration: YouTube's interface design

Open Source Community: All amazing libraries and tools used

🚧 Roadmap
Add user authentication

Implement collaborative filtering

Add watch history and favorites

Deploy to cloud platform

Add rating system

Implement watchlists

Add multiple language support

<div align="center">
Made with ❤️ by Ramanand Mandal
"Good movies tell stories, great movies create experiences."

⭐ Star this repo if you found it helpful!

</div> ```