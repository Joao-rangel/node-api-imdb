import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMovieService from '../services/CreateMovieService';
import FindMovieService from '../services/FindMovieService';

export default class moviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, genre, director, actors } = request.body;

    const createMovie = container.resolve(CreateMovieService);

    const movie = await createMovie.execute({
      name,
      genre,
      director,
      actors,
    });

    return response.json(movie);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findMovie = container.resolve(FindMovieService);

    const movie = await findMovie.execute({ id });

    return response.json(movie);
  }
}
