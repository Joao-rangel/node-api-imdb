import { getRepository, Repository } from 'typeorm';

import Rating from '../entities/Rating';
import IRatingsRepository from '../../repositories/IRatingsRepository';
import ICreateRatingDTO from '../../dtos/ICreateRatingDTO';

class RatingsRepository implements IRatingsRepository {
  private ormRepository: Repository<Rating>;

  constructor() {
    this.ormRepository = getRepository(Rating);
  }

  async findAllByMovieId(movie_id: string): Promise<Rating[]> {
    const ratings = await this.ormRepository.find({ where: { movie_id } });

    return ratings;
  }

  public async create({
    user_id,
    movie_id,
    user_rating,
  }: ICreateRatingDTO): Promise<Rating> {
    const rating = this.ormRepository.create({
      user_id,
      movie_id,
      user_rating,
    });

    await this.ormRepository.save(rating);

    return rating;
  }
}

export default RatingsRepository;
