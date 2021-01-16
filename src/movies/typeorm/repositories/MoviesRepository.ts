import { getRepository, Repository } from 'typeorm';

import Movie from '../entities/Movie';
import IMoviesRepository from '../../repositories/IMoviesRepository';
import ICreateMovieDTO from '../../dtos/ICreateMovieDTO';
import ISearchMovieDTO from '../../dtos/ISearchMovieDTO';

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async create({
    name,
    genre,
    director,
    actors,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = this.ormRepository.create({
      name,
      genre,
      director,
      actors,
    });

    await this.ormRepository.save(movie);

    return movie;
  }

  public async findById(id: string): Promise<Movie> {
    const movie = await this.ormRepository.findOne(id);

    if (!movie) throw new Error('Invalid movie id.');

    return movie;
  }

  public async findAllBy(search: ISearchMovieDTO): Promise<Movie[]> {
    throw new Error('Method not implemented.');
  }
}

export default MoviesRepository;
