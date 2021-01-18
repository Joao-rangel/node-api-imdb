import { Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';
import { container } from 'tsyringe';

import CreateRatingService from '../services/CreateRatingService';
import FindMovieRatingsService from '../services/FindMovieRatingsService';

export default class RatingsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movie_id, user_rating } = request.body;
    const user_id = request.user.id;

    const createRating = container.resolve(CreateRatingService);

    const userRating = await createRating.execute({
      user_id,
      movie_id,
      user_rating,
    });

    const ratingSerializer = new Serializer('ratings', {
      attributes: ['user_id', 'movie_id', 'user_rating', 'created_at'],
    });

    return response.json(ratingSerializer.serialize(userRating));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findMovieRatings = container.resolve(FindMovieRatingsService);

    const movieRatings = await findMovieRatings.execute({ movie_id: id });

    const ratingSerializer = new Serializer('ratings', {
      attributes: ['user_id', 'movie_id', 'user_rating', 'created_at'],
    });

    return response.json(ratingSerializer.serialize(movieRatings));
  }
}
