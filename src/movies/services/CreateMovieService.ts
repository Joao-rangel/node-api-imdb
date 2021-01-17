import { injectable, inject } from 'tsyringe';

import { Serializer } from 'jsonapi-serializer';
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

    const movieSerializer = new Serializer('movies', {
      attributes: ['name', 'genre', 'director', 'actors', 'createdAt'],
    });

    return movieSerializer.serialize(movie);
  }
}

export default CreateMovieService;
