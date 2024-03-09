import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class MovieCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  @IsArray()
  genre: Array<string>;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(0)
  ratings: Number;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsUrl()
  cover: string;

  @IsOptional()
  @IsUrl()
  streamingLink: string;
}
