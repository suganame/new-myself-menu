import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;
}
