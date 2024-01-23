import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  cnpj: string;
}
