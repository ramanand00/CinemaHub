from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class Movie(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    genres: str
    overview: str
    poster_url: Optional[str] = None
    video_url: Optional[str] = None
    created_by: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

class MovieCreate(BaseModel):
    title: str
    genres: str
    overview: str
    poster_url: Optional[str] = None
    video_url: Optional[str] = None

class MovieUpdate(BaseModel):
    title: Optional[str] = None
    genres: Optional[str] = None
    overview: Optional[str] = None
    poster_url: Optional[str] = None
    video_url: Optional[str] = None