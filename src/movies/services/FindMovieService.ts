import { injectable, inject } from 'tsyringe';

import { Serializer } from 'jsonapi-serializer';
import Movie from '../typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';

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

    const movieSerializer = new Serializer('movies', {
      attributes: ['name', 'genre', 'director', 'actors'],
    });

    return movieSerializer.serialize(movie);
  }
}

export default FindMovieService;
