import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class MovieUpdateDto {
  @IsOptional()
  title: string;

  @IsNotEmpty()
  user: string;

  @IsOptional()
  @IsArray()
  genre: Array<string>;

  @IsOptional()
  @IsNumber()
  @Max(5)
  @Min(0)
  ratings: Number;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsUrl()
  streamingLink: string;

  @IsOptional()
  @IsUrl()
  cover: string;
}
