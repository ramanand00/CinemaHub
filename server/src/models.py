from pydantic import BaseModel
from typing import List, Optional


class Movie(BaseModel):
    id: int
    title: str
    genres: str
    overview: str
    poster_url: Optional[str] = None
    video_url: Optional[str] = None


class RecommendationRequest(BaseModel):
    movie_title: str
    top_n: Optional[int] = 10


class RecommendationResponse(BaseModel):
    current_movie: Movie
    recommendations: List[Movie]
    message: str
