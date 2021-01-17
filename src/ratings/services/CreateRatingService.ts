import { injectable, inject } from 'tsyringe';

import Rating from '../typeorm/entities/Rating';
import IRatingsRepository from '../repositories/IRatingsRepository';

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
  ) {}

  public async execute({
    user_id,
    movie_id,
    user_rating,
  }: IRequest): Promise<Rating> {
    const rating = await this.ratingsRepository.create({
      user_id,
      movie_id,
      user_rating,
    });

    return rating;
  }
}

export default CreateRatingService;
