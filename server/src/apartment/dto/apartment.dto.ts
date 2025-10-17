import {
  IsOptional,
  IsInt,
  Min,
  Max,
  Matches,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsIn,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

const trimValue = ({ value }: { value: string }) => value.trim();

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

  @IsOptional()
  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[^<>]*$/, {
    message: 'search parameter must not contain HTML tags',
  })
  search?: string;

  @IsOptional()
  @IsString()
  @Transform(trimValue, { toClassOnly: true })
  @MinLength(1)
  @MaxLength(255)
  @Matches(/^[^<>]*$/, {
    message: 'project parameter must not contain HTML tags',
  })
  project?: string;

  @IsOptional()
  @IsString()
  @IsIn(['available', 'rented', 'pending'])
  status?: string;
}

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

  @IsString()
  @IsIn(['available', 'rented', 'pending'])
  status!: string;

  @IsArray()
  @IsString({ each: true })
  amenities!: string[];

  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message:
      'area must be a decimal string with up to 2 digits after the decimal point',
  })
  area!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  bathrooms!: number;
}
