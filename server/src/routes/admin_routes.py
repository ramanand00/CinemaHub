from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List
from datetime import datetime
from bson import ObjectId
import shutil
import os
from pathlib import Path

from src.config.database import movies_collection
from src.models.movie_model import Movie, MovieCreate, MovieUpdate
from src.utils.auth import get_current_admin_user
from src.models.user_model import User

router = APIRouter(prefix="/admin", tags=["Admin"])

# Create upload directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/movies", response_model=Movie)
async def create_movie(
    movie: MovieCreate,
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new movie (Admin only)"""
    try:
        movie_dict = movie.dict()
        movie_dict["created_by"] = str(current_user.id)
        movie_dict["created_at"] = datetime.utcnow()
        movie_dict["updated_at"] = datetime.utcnow()
        
        result = await movies_collection.insert_one(movie_dict)
        created_movie = await movies_collection.find_one({"_id": result.inserted_id})
        
        if created_movie:
            created_movie["_id"] = str(created_movie["_id"])
            return created_movie
        else:
            raise HTTPException(status_code=500, detail="Failed to create movie")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/movies/{movie_id}", response_model=Movie)
async def update_movie(
    movie_id: str,
    movie_update: MovieUpdate,
    current_user: User = Depends(get_current_admin_user)
):
    """Update a movie (Admin only)"""
    try:
        if not ObjectId.is_valid(movie_id):
            raise HTTPException(status_code=400, detail="Invalid movie ID")
        
        update_data = {k: v for k, v in movie_update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await movies_collection.update_one(
            {"_id": ObjectId(movie_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Movie not found")
        
        updated_movie = await movies_collection.find_one({"_id": ObjectId(movie_id)})
        updated_movie["_id"] = str(updated_movie["_id"])
        return updated_movie
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/movies/{movie_id}")
async def delete_movie(
    movie_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a movie (Admin only)"""
    try:
        if not ObjectId.is_valid(movie_id):
            raise HTTPException(status_code=400, detail="Invalid movie ID")
        
        result = await movies_collection.delete_one({"_id": ObjectId(movie_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Movie not found")
        
        return {"message": "Movie deleted successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/movies/bulk")
async def bulk_import_movies(
    movies: List[MovieCreate],
    current_user: User = Depends(get_current_admin_user)
):
    """Bulk import movies from CSV data (Admin only)"""
    try:
        movies_list = []
        for movie in movies:
            movie_dict = movie.dict()
            movie_dict["created_by"] = str(current_user.id)
            movie_dict["created_at"] = datetime.utcnow()
            movie_dict["updated_at"] = datetime.utcnow()
            movies_list.append(movie_dict)
        
        result = await movies_collection.insert_many(movies_list)
        return {
            "message": f"Successfully imported {len(result.inserted_ids)} movies",
            "inserted_ids": [str(id) for id in result.inserted_ids]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload/poster")
async def upload_poster(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_admin_user)
):
    """Upload movie poster image (Admin only)"""
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Generate unique filename
        file_extension = file.filename.split(".")[-1]
        filename = f"{datetime.utcnow().timestamp()}.{file_extension}"
        file_path = UPLOAD_DIR / filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return URL (you might want to serve these files via a static file server)
        file_url = f"/uploads/{filename}"
        return {"url": file_url, "filename": filename}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))