import { Expose } from 'class-transformer';

export class MoviesResponseDto {
  @Expose()
  title: string;

  @Expose()
  genre: Array<string>;

  @Expose()
  ratings: Number;

  @Expose()
  description?: string;

  @Expose()
  streamingLink?: Number;
}
