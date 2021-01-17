import { injectable, inject } from 'tsyringe';

import rating from '../typeorm/entities/Rating';
import IRatingsRepository from '../repositories/IRatingsRepository';

interface IRequest {
  movie_id: string;
}

@injectable()
class FindMovieRatingsService {
  constructor(
    @inject('RatingsRepository')
    private ratingsRepository: IRatingsRepository,
  ) {}

  public async execute({ movie_id }: IRequest): Promise<rating[]> {
    const ratings = await this.ratingsRepository.findAllByMovieId(movie_id);

    return ratings;
  }
}

export default FindMovieRatingsService;
