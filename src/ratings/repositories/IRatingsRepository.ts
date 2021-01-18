import Rating from '../typeorm/entities/Rating';
import ICreateRatingDTO from '../dtos/ICreateRatingDTO';

export default interface IRatingsRepository {
  create(rating: ICreateRatingDTO): Promise<Rating>;
  findAllByMovieId(movie_id: string): Promise<Rating[]>;
  findByUserIdAndMovieId(
    user_id: string,
    movie_id: string,
  ): Promise<Rating | undefined>;
}
