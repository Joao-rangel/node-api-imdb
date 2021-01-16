import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMovieService from '../services/CreateMovieService';

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
}
