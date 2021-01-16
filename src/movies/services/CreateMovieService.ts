import { injectable, inject } from 'tsyringe';

import Movie from '../typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

interface IRequest {
  name: string;
  genre: string;
  director: string;
  actors: string;
}
@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private MoviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    name,
    genre,
    director,
    actors,
  }: IRequest): Promise<Movie> {
    const movie = await this.MoviesRepository.create({
      name,
      genre,
      director,
      actors,
    });

    return movie;
  }
}

export default CreateMovieService;
