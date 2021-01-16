import { container } from 'tsyringe';

import IUsersRepository from '../../users/repositories/IUsersRepository';
import UsersRepository from '../../users/typeorm/repositories/UsersRepository';
import IMoviesRepository from '../../movies/repositories/IMoviesRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);
