import asyncio
import sys
import os
import pandas as pd
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from src.config.database import movies_collection
from datetime import datetime

async def import_csv_to_mongodb(csv_path):
    """Import movies from CSV to MongoDB"""
    try:
        # Read CSV
        df = pd.read_csv(csv_path)
        print(f"📄 Found {len(df)} movies in CSV")
        
        # Convert to dict and add timestamps
        movies = []
        for _, row in df.iterrows():
            movie = {
                "title": row["title"],
                "genres": row["genres"],
                "overview": row["overview"],
                "poster_url": row.get("poster_url", ""),
                "video_url": row.get("video_url", ""),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "created_by": "system"
            }
            movies.append(movie)
        
        # Clear existing movies (optional)
        await movies_collection.delete_many({})
        print("🗑️ Cleared existing movies")
        
        # Insert new movies
        result = await movies_collection.insert_many(movies)
        print(f"✅ Successfully imported {len(result.inserted_ids)} movies to MongoDB")
        
    except Exception as e:
        print(f"❌ Error importing movies: {e}")

if __name__ == "__main__":
    csv_path = os.path.join(os.path.dirname(__file__), "../../data/movies.csv")
    asyncio.run(import_csv_to_mongodb(csv_path))