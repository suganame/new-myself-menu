import { IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  description: string;
}
