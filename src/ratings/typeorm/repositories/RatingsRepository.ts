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
    return this.ormRepository.find({ where: { movie_id } });
  }

  async findByUserIdAndMovieId(
    user_id: string,
    movie_id: string,
  ): Promise<Rating | undefined> {
    return this.ormRepository.findOne({ where: { user_id, movie_id } });
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

    return this.ormRepository.save(rating);
  }
}

export default RatingsRepository;
