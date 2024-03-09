import { MovieCreateDto } from 'src/movies/dtos/movies.create.dto';
import MovieModel from './schemas/movies.schema';
import { MovieUpdateDto } from 'src/movies/dtos/movies.update.dto';
import { getCache } from '../caching/redis';

const allowedGet = {
  _id: 1,
  title: 1,
  genre: 1,
  description: 1,
  streamingLink: 1,
  cover: 1,
  ratings: 1,
};

const getAllMovies = () => {
  return MovieModel.find().select(allowedGet).lean();
};

const getByTitleOrGenre = async (query: string) => {
  // check cache first
  const movies = await getCache(query.toLowerCase());
  if (movies) {
    return movies;
  }
  // if not in cache
  return MovieModel.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { genre: { $regex: query, $options: 'i' } },
    ],
  })
    .select(allowedGet)
    .lean();
};

const addNewMovie = (body: MovieCreateDto) => {
  return MovieModel.create(body);
};

const updateMovieDetails = (body: MovieUpdateDto, id: string) => {
  return MovieModel.findByIdAndUpdate(id, {
    $set: body,
  }).catch((_) => null);
};

const deleteMovieById = (id: string) => {
  return MovieModel.findByIdAndDelete(id).catch((_) => null);
};

export {
  getAllMovies,
  getByTitleOrGenre,
  addNewMovie,
  updateMovieDetails,
  deleteMovieById,
};
