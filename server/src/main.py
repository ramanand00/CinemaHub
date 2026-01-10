from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from src.models import Movie, RecommendationResponse
from src.database import db


app = FastAPI(
    title="Movie Recommendation API",
    description="A content-based movie recommendation system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Movie Recommendation API",
        "endpoints": {
            "movies": "/movies",
            "recommend": "/recommend/{movie_title}",
            "search": "/search/{query}"
        }
    }


@app.get("/movies", response_model=List[Movie])
async def get_all_movies():
    return db.get_all_movies()


@app.get("/movies/{movie_title}", response_model=Movie)
async def get_movie(movie_title: str):
    movie = db.get_movie_by_title(movie_title)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


@app.get("/recommend/{movie_title}", response_model=RecommendationResponse)
async def recommend(movie_title: str, top_n: int = 10):
    movie = db.get_movie_by_title(movie_title)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    recommendations = db.get_recommendations(movie_title, top_n)

    return RecommendationResponse(
        current_movie=movie,
        recommendations=recommendations,
        message=f"Found {len(recommendations)} recommendations"
    )


@app.get("/search/{query}")
async def search_movies(query: str):
    results = [
        movie for movie in db.get_all_movies()
        if query.lower() in movie["title"].lower()
    ]
    return {"query": query, "results": results, "count": len(results)}


@app.get("/health")
async def health():
    return {"status": "healthy"}
