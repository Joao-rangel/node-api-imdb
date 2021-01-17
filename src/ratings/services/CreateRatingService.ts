import { injectable, inject } from 'tsyringe';

import Rating from '../typeorm/entities/Rating';
import IRatingsRepository from '../repositories/IRatingsRepository';
import IMoviesRepository from '../../movies/repositories/IMoviesRepository';
import AppError from '../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  movie_id: string;
  user_rating: 0 | 1 | 2 | 3 | 4;
}
@injectable()
class CreateRatingService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,

    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    user_id,
    movie_id,
    user_rating,
  }: IRequest): Promise<Rating> {
    const allowedRatingValues = [0, 1, 2, 3, 4];

    if (!allowedRatingValues.includes(user_rating)) {
      throw new AppError('Invalid rating value.');
    }

    const movie = await this.moviesRepository.findById(movie_id);

    if (!movie) throw new AppError('Invalid movie id.');

    const rating = await this.ratingsRepository.create({
      user_id,
      movie_id,
      user_rating,
    });

    Object.assign(movie, {
      rating_number: (movie.rating_number += 1),
      rating_sum: (movie.rating_sum += user_rating),
      rating: movie.rating_sum / movie.rating_number,
    });

    this.moviesRepository.save(movie);

    return rating;
  }
}

export default CreateRatingService;
