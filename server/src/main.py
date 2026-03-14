from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
from pathlib import Path

from src.config.database import movies_collection
from src.models.movie_model import Movie
from src.routes import auth_routes, admin_routes
from src.recommender import MovieRecommender
import pandas as pd
from bson import ObjectId

app = FastAPI(
    title="CinemaHub API",
    description="Movie recommendation system with MongoDB",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth_routes.router)
app.include_router(admin_routes.router)

# Initialize recommender
recommender = None

@app.on_event("startup")
async def startup_event():
    """Load movies from MongoDB and initialize recommender on startup"""
    global recommender
    try:
        # Load all movies from MongoDB
        movies_cursor = movies_collection.find()
        movies = await movies_cursor.to_list(length=None)
        
        if movies:
            # Convert to DataFrame for recommender
            movies_df = pd.DataFrame(movies)
            movies_df["_id"] = movies_df["_id"].astype(str)
            
            # Save temporarily for recommender
            temp_path = "data/temp_movies.csv"
            movies_df.to_csv(temp_path, index=False)
            
            # Initialize recommender
            recommender = MovieRecommender(temp_path)
            print(f"✅ Loaded {len(movies)} movies from MongoDB")
        else:
            print("⚠️ No movies found in database")
            
    except Exception as e:
        print(f"❌ Error loading movies: {e}")

@app.get("/")
async def root():
    return {
        "message": "Welcome to CinemaHub API",
        "version": "2.0.0",
        "endpoints": {
            "movies": "/movies",
            "recommend": "/recommend/{movie_title}",
            "search": "/search/{query}",
            "auth": "/auth",
            "admin": "/admin"
        }
    }

@app.get("/movies", response_model=List[Movie])
async def get_all_movies():
    """Get all movies"""
    movies = await movies_collection.find().to_list(length=None)
    for movie in movies:
        movie["_id"] = str(movie["_id"])
    return movies

@app.get("/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: str):
    """Get movie by ID"""
    try:
        if not ObjectId.is_valid(movie_id):
            raise HTTPException(status_code=400, detail="Invalid movie ID")
        
        movie = await movies_collection.find_one({"_id": ObjectId(movie_id)})
        if not movie:
            raise HTTPException(status_code=404, detail="Movie not found")
        
        movie["_id"] = str(movie["_id"])
        return movie
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recommend/{movie_title}")
async def recommend_movies(movie_title: str, top_n: int = 10):
    """Get movie recommendations"""
    global recommender
    if not recommender:
        raise HTTPException(status_code=503, detail="Recommender not initialized")
    
    recommendations = recommender.get_recommendations(movie_title, top_n)
    return {
        "current_movie": movie_title,
        "recommendations": recommendations,
        "count": len(recommendations)
    }

@app.get("/search/{query}")
async def search_movies(query: str):
    """Search movies by title"""
    try:
        # Case-insensitive search using regex
        regex_pattern = f".*{query}.*"
        movies = await movies_collection.find({
            "title": {"$regex": regex_pattern, "$options": "i"}
        }).to_list(length=None)
        
        for movie in movies:
            movie["_id"] = str(movie["_id"])
        
        return {
            "query": query,
            "results": movies,
            "count": len(movies)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    """Health check endpoint"""
    try:
        # Check MongoDB connection
        await movies_collection.find_one()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}