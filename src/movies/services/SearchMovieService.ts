import { injectable, inject } from 'tsyringe';
import { Serializer } from 'jsonapi-serializer';

import Movie from '../typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

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

    const movieSerializer = new Serializer('movies', {
      attributes: ['name', 'genre', 'director', 'actors'],
    });

    return movieSerializer.serialize(movies);
  }
}

export default FindMovieService;
