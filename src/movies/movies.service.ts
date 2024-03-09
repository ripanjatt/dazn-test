import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  addNewMovie,
  deleteMovieById,
  getAllMovies,
  getByTitleOrGenre,
  updateMovieDetails,
} from '../mongodb/crud';
import { MoviesResponseDto } from './dtos/movies.response.dto';
import { MovieCreateDto } from './dtos/movies.create.dto';
import { MovieUpdateDto } from './dtos/movies.update.dto';

@Injectable()
export class MoviesService {
  async get() {
    const movies = await getAllMovies();
    return plainToInstance(MoviesResponseDto, movies);
  }

  async getBy(query: string) {
    if (!query) {
      throw new NotFoundException('Invalid request!');
    }
    const movie = await getByTitleOrGenre(query);
    if (movie) {
      return plainToInstance(MoviesResponseDto, movie);
    }
    throw new NotFoundException('Movie not found!');
  }

  async addMovie(movie: MovieCreateDto) {
    const response = await addNewMovie(movie);
    return {
      status: 'ADDED',
      _id: response._id,
    };
  }

  async updateMovie(updatedMovie: MovieUpdateDto, id: string) {
    const response = await updateMovieDetails(updatedMovie, id);
    if (!response) {
      return {
        status: 'FAILED',
        error: "Id doesn't exist for any movie",
      };
    }
    return {
      status: 'UPDATED',
      _id: id,
    };
  }

  async deleteMovie(id: string) {
    const response = await deleteMovieById(id);
    if (!response) {
      return {
        status: 'FAILED',
        error: "Id doesn't exist for any movie",
      };
    }
    return {
      status: 'DELETED',
      _id: id,
    };
  }
}
