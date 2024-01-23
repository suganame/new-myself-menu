import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantEntity | Error> {
    return await this.restaurantRepository.save(createRestaurantDto);
  }

  async findAll(): Promise<RestaurantEntity[] | Error> {
    return await this.restaurantRepository.find({ withDeleted: true });
  }

  async findOne(id: number): Promise<RestaurantEntity | Error> {
    return await this.restaurantRepository.findOneByOrFail({ id });
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<RestaurantEntity | Error> {
    await this.restaurantRepository.update({ id }, updateRestaurantDto);
    return await this.restaurantRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<RestaurantEntity | Error> {
    return await this.restaurantRepository.softRemove({ id });
  }
}
