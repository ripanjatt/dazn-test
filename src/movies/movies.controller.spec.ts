import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieCreateDto } from './dtos/movies.create.dto';
import { MovieUpdateDto } from './dtos/movies.update.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // for getting all movies
  it('should return an array of movies', async () => {
    const movies = [
      {
        _id: '1',
        title: 'Movie 1',
        genre: ['Action', 'Adventure'],
        ratings: 4.5,
      },
    ];

    jest.spyOn(service, 'get' as keyof MoviesService).mockResolvedValue(movies);

    expect(await controller.get()).toEqual(movies);
  });

  // for getting by title or genre
  it('should return an array of movies', async () => {
    const movies = [
      {
        _id: '1',
        title: 'Movie 1',
        genre: ['Action', 'Adventure'],
        ratings: 4.5,
      },
    ];

    jest
      .spyOn(service, 'getBy' as keyof MoviesService)
      .mockResolvedValue(movies);

    expect(await controller.search('test')).toEqual(movies);
  });

  // for adding a new movie
  it('should return an "ADDED" response', async () => {
    const request: MovieCreateDto = {
      title: 'Movie 1',
      genre: ['Action', 'Adventure'],
      ratings: 4.5,
      user: '',
      streamingLink: '',
      cover: '',
      description: '',
    };
    const response = {
      status: 'ADDED',
      _id: 'id',
    };

    jest
      .spyOn(service, 'addMovie' as keyof MoviesService)
      .mockResolvedValue(response);

    expect(await controller.addMovie(request, '')).toEqual(response);
  });

  // for updating the movie details
  it('should return an "UPDATED" status', async () => {
    const request: MovieUpdateDto = {
      title: 'Movie 1',
      genre: ['Action', 'Adventure'],
      ratings: 4.5,
      user: '',
      streamingLink: '',
      cover: '',
      description: '',
    };
    const response = {
      status: 'UPDATED',
      _id: 'id',
    };

    jest
      .spyOn(service, 'updateMovie' as keyof MoviesService)
      .mockResolvedValue(response);

    expect(
      await controller.updateMovie(request, '65ec999ce89af12300c8fe0f', ''),
    ).toEqual(response);
  });

  // for deleting the movie
  it('should return an "DELETED" status', async () => {
    const response = {
      status: 'DELETED',
      _id: 'id',
    };

    jest
      .spyOn(service, 'deleteMovie' as keyof MoviesService)
      .mockResolvedValue(response);

    expect(
      await controller.deleteMovie('65ec999ce89af12300c8fe0f', ''),
    ).toEqual(response);
  });
});
