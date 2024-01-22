import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  Param,
  // Delete,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
// import { CreateRestaurantDto } from './dto/create-restaurant.dto';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FindOneParams } from './dto/find-one-params.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // @Post()
  // create(@Body() createRestaurantDto: CreateRestaurantDto) {
  //   return this.restaurantService.create(createRestaurantDto);
  // }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.restaurantService.findOne(+params.id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRestaurantDto: UpdateRestaurantDto,
  // ) {
  //   return this.restaurantService.update(+id, updateRestaurantDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.restaurantService.remove(+id);
  // }
}
