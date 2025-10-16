import { IsOptional, IsInt, Min, Max, Matches } from 'class-validator';
import { Type } from 'class-transformer';

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
