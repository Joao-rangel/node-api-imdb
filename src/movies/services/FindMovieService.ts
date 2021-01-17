import { injectable, inject } from 'tsyringe';

import Movie from '../typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';
import AppError from '../../shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class FindMovieService {
  constructor(
    @inject('MoviesRepository')
    private MoviesRepository: IMoviesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Movie> {
    const movie = await this.MoviesRepository.findById(id);

    if (!movie) throw new AppError('Invalid movie id.');

    return movie;
  }
}

export default FindMovieService;
