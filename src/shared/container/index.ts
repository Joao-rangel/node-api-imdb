import { container } from 'tsyringe';

import '../../users/providers';

import IUsersRepository from '../../users/repositories/IUsersRepository';
import UsersRepository from '../../users/typeorm/repositories/UsersRepository';
import IMoviesRepository from '../../movies/repositories/IMoviesRepository';
import MoviesRepository from '../../movies/typeorm/repositories/MoviesRepository';
import IRatingsRepository from '../../ratings/repositories/IRatingsRepository';
import RatingsRepository from '../../ratings/typeorm/repositories/RatingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);

container.registerSingleton<IRatingsRepository>(
  'RatingsRepository',
  RatingsRepository,
);
