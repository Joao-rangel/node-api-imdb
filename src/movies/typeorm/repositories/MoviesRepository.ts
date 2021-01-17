import { getRepository, Like, Repository } from 'typeorm';

import Movie from '../entities/Movie';
import IMoviesRepository from '../../repositories/IMoviesRepository';
import ICreateMovieDTO from '../../dtos/ICreateMovieDTO';
import ISearchMovieDTO from '../../dtos/ISearchMovieDTO';

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async save(movie: Movie): Promise<Movie> {
    await this.ormRepository.save(movie);

    return movie;
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

  public async findById(id: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne(id);

    return movie;
  }

  public async findByName(name: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne({ where: { name } });

    return movie;
  }

  public async findAllBy({
    name,
    genre,
    director,
    actors,
  }: ISearchMovieDTO): Promise<Movie[]> {
    const search = {};

    if (name) Object.assign(search, { name: Like(`%${name}%`) });
    if (genre) Object.assign(search, { genre });
    if (director) Object.assign(search, { director: Like(`%${director}%`) });
    if (actors) Object.assign(search, { actors: Like(`%${actors}%`) });

    const movies = await this.ormRepository.find({
      where: search,
    });

    return movies;
  }
}

export default MoviesRepository;
