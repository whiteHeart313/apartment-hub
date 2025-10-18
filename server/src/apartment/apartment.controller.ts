import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApartmentService } from '@app/apartment/apartment.service';
import { CreateApartmentDto, PaginationQueryDto } from './dto/apartment.dto';

@Controller('v1/apartments')
export class ApartmentController {
  constructor(private readonly apartService: ApartmentService) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: PaginationQueryDto) {
    // validation of this values are handled by the dto
    const { page = 1, perPage = 10, search, project, status } = query;
    const pageNum = page;
    const perPageNum = perPage;

    return this.apartService.findAll(pageNum, perPageNum, {
      search,
      project,
      status,
    });
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.apartService.findOne(Number(id));
  }

  @Post('add-apartmen')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() apartmentDto: CreateApartmentDto) {
    return this.apartService.createApartment(apartmentDto);
  }

  @Post('upload-images')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: join(
          process.cwd(),
          '..',
          'client',
          'public',
          'images',
          'apartments',
        ),
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
          const extension = extname(file.originalname);
          const filename = `apartment-${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];

        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Only JPEG, PNG, and WebP images are allowed',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per file
        files: 4, // Maximum 4 files
      },
    }),
  )
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (files?.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const imageUrls = files.map(
      (file) => `/images/apartments/${file.filename}`,
    );

    return {
      message: 'Images uploaded successfully',
      images: imageUrls,
    };
  }
}
