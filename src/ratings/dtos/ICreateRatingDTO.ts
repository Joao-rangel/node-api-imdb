export default interface ICreateMovieDTO {
  movie_id: string;
  user_id: string;
  user_rating: 0 | 1 | 2 | 3 | 4;
}
