import {
  IsOptional,
  IsInt,
  Min,
  Max,
  Matches,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Matches(/^\d+$/) // to reject formats like (1e0) which = 1
  @Type(() => Number)
  @IsInt() // int to prevent values like 2.5 / '20'
  @Min(1)
  @Max(10) // max 10 to prevent DOS attack
  page?: number;

  @IsOptional()
  @Matches(/^\d+$/)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  perPage?: number;
}

// we sure that value is string
const trimValue = ({ value }: { value: string }) => value.trim();

export class searchDTO {
  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[^<>]*$/, {
    message: 'search parameter must not contain HTML tags',
  })
  q: string;
}

export class CreateApartmentDto {
  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(3)
  @MaxLength(255)
  unit_name!: string;

  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(1)
  @MaxLength(255)
  unit_number!: string;

  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(1)
  @MaxLength(255)
  project!: string;

  @IsString()
  @MinLength(10)
  address!: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message:
      'price must be a decimal string with up to 2 digits after the decimal point',
  })
  price!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms!: number;

  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(10)
  @MaxLength(255)
  @Matches(/^[^<>]*$/, {
    message: 'description must not contain HTML tags',
  })
  description!: string;
}
