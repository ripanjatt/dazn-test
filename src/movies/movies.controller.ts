import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieCreateDto } from './dtos/movies.create.dto';
import { MovieUpdateDto } from './dtos/movies.update.dto';
import { AdminValidator } from '../auth/validators/validateAdmin';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/')
  get() {
    return this.moviesService.get();
  }

  @Get('/search')
  search(@Query('q') query: string) {
    return this.moviesService.getBy(query);
  }

  @Post('/')
  addMovie(@Body() body: MovieCreateDto, @AdminValidator() _) {
    return this.moviesService.addMovie(body);
  }

  @Put('/:id')
  updateMovie(
    @Body() body: MovieUpdateDto,
    @Param('id') id: string,
    @AdminValidator() _,
  ) {
    return this.moviesService.updateMovie(body, id);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string, @AdminValidator() _) {
    return this.moviesService.deleteMovie(id);
  }
}
