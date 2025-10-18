import { IsString, IsOptional, Matches } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'filename must contain only alphanumeric characters, hyphens, and underscores',
  })
  filename!: string;

  @IsOptional()
  @IsString()
  apartmentId?: string;
}
