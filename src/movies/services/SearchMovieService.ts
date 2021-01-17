import { injectable, inject } from 'tsyringe';

import Movie from '../typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';
import AppError from '../../shared/errors/AppError';

interface IRequest {
  name?: string;
  genre?: string;
  director?: string;
  actors?: string;
}

@injectable()
class FindMovieService {
  constructor(
    @inject('MoviesRepository')
    private MoviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    name,
    genre,
    director,
    actors,
  }: IRequest): Promise<Movie[]> {
    const movies = await this.MoviesRepository.findAllBy({
      name,
      genre,
      director,
      actors,
    });

    if (!movies) throw new AppError('The search did not match any movies.');

    return movies;
  }
}

export default FindMovieService;
