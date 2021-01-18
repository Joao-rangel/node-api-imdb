import { injectable, inject } from 'tsyringe';

import Movie from '../typeorm/entities/Movie';
import IMoviesRepository from '../repositories/IMoviesRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import AppError from '../../shared/errors/AppError';

interface IRequest {
  user_id: string;
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

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    genre,
    director,
    actors,
  }: IRequest): Promise<Movie> {
    const user = await this.usersRepository.findById(user_id);

    if (!user?.admin) {
      throw new AppError('You do not have credentials to create a movie.');
    }

    const existentMovie = await this.MoviesRepository.findByName(name);

    if (existentMovie) {
      throw new AppError('This movie title is already being used.');
    }

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
