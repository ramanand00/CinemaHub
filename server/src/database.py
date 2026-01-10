from typing import List, Optional
from src.recommender import MovieRecommender
import os


class Database:
    """Database layer for movie data"""

    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(__file__))
        data_path = os.path.join(base_dir, "data", "movies.csv")

        self.recommender = MovieRecommender(data_path)

    def get_all_movies(self) -> List[dict]:
        return self.recommender.get_all_movies()

    def get_movie_by_title(self, title: str) -> Optional[dict]:
        return self.recommender.get_movie_by_title(title)

    def get_recommendations(self, title: str, top_n: int = 10) -> List[dict]:
        return self.recommender.get_recommendations(title, top_n)


db = Database()
