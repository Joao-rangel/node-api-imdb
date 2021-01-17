import Movie from '../typeorm/entities/Movie';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';
import ISearchMovieDTO from '../dtos/ISearchMovieDTO';

export default interface IMoviesRepository {
  create(movie: ICreateMovieDTO): Promise<Movie>;
  save(movie: Movie): Promise<Movie>;
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  findAllBy(search: ISearchMovieDTO): Promise<Movie[]>;
}
