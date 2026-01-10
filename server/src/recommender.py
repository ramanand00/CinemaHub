import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class MovieRecommender:
    """Content-based movie recommendation system"""

    def __init__(self, data_path: str):
        self.data_path = data_path
        self.movies_df = None
        self.indices = None

        self._load_data()
        self._prepare_model()

    def _load_data(self):
        self.movies_df = pd.read_csv(self.data_path)
        self.movies_df["overview"] = self.movies_df["overview"].fillna("")
        self.movies_df["combined"] = (
            self.movies_df["genres"] + " " + self.movies_df["overview"]
        )
        print(f"✅ Loaded {len(self.movies_df)} movies")

    def _prepare_model(self):
        vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
        tfidf = vectorizer.fit_transform(self.movies_df["combined"])
        self.similarity = cosine_similarity(tfidf, tfidf)

        self.indices = pd.Series(
            self.movies_df.index,
            index=self.movies_df["title"].str.lower()
        ).to_dict()

        print("✅ Recommendation model ready")

    def get_recommendations(self, title: str, top_n: int = 10):
        title = title.lower()
        if title not in self.indices:
            return []

        idx = self.indices[title]
        scores = list(enumerate(self.similarity[idx]))
        scores = sorted(scores, key=lambda x: x[1], reverse=True)[1: top_n + 1]
        indices = [i[0] for i in scores]

        return self.movies_df.iloc[indices].to_dict("records")

    def get_all_movies(self):
        return self.movies_df.to_dict("records")

    def get_movie_by_title(self, title: str):
        movie = self.movies_df[
            self.movies_df["title"].str.lower() == title.lower()
        ]
        if movie.empty:
            return None
        return movie.iloc[0].to_dict()
