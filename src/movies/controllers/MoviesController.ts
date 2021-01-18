import { Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';
import { container } from 'tsyringe';

import CreateMovieService from '../services/CreateMovieService';
import FindMovieService from '../services/FindMovieService';
import SearchMovieService from '../services/SearchMovieService';

export default class MoviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, genre, director, actors } = request.body;
    const { id } = request.user;

    const createMovie = container.resolve(CreateMovieService);

    const movie = await createMovie.execute({
      user_id: id,
      name,
      genre,
      director,
      actors,
    });

    const movieSerializer = new Serializer('movies', {
      attributes: ['name', 'genre', 'director', 'actors', 'rating'],
    });

    return response.json(movieSerializer.serialize(movie));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findMovie = container.resolve(FindMovieService);

    const movie = await findMovie.execute({ id });

    const movieSerializer = new Serializer('movies', {
      attributes: ['name', 'genre', 'director', 'actors', 'rating'],
    });

    return response.json(movieSerializer.serialize(movie));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, genre, director, actors } = request.query;

    const searchMovie = container.resolve(SearchMovieService);

    const movie = await searchMovie.execute({
      name: name?.toString(),
      genre: genre?.toString(),
      director: director?.toString(),
      actors: actors?.toString(),
    });

    const movieSerializer = new Serializer('movies', {
      attributes: ['name', 'genre', 'director', 'actors', 'rating'],
    });

    return response.json(movieSerializer.serialize(movie));
  }
}
