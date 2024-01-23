import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantEntity } from './entities/restaurant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let repositoryMock: Repository<RestaurantEntity>;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(RestaurantEntity),
          useFactory: () => {
            return repositoryMock;
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);

    jest.clearAllMocks();
  });

  it('should controller be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('tests on findOne method', () => {
    it('should return successfully', async () => {
      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        id: 1,
        description: 'teste',
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(controller, 'findOne');

      const result = await controller.findOne({ id: 1 });

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toBe(mockReturnedValue);
    });

    it('should throws status 404 when missing register', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Not Found', HttpStatus.NOT_FOUND),
        );

      const spy = jest.spyOn(controller, 'findOne');

      try {
        await controller.findOne({ id: 1 });
      } catch (error: any) {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ id: 1 });
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
      }
    });
  });

  describe('tests on findAll method', () => {
    it('should return successfully', async () => {
      const mockReturnedValue: RestaurantEntity[] = [
        {
          cnpj: '11223344',
          id: 1,
          description: 'teste',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(controller, 'findAll');

      const result = await controller.findAll();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockReturnedValue);
    });
  });

  describe('tests on create method', () => {
    it('should return successfully', async () => {
      const mockValue: CreateRestaurantDto = {
        cnpj: '11223344',
        description: 'teste',
      };

      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        description: 'teste',
        id: 1,
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(controller, 'create');

      const result = await controller.create(mockValue);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(mockValue);
      expect(result).toBe(mockReturnedValue);
    });

    it('should throws status 500 when fails', async () => {
      const mockValue: CreateRestaurantDto = {
        cnpj: '11223344',
        description: 'teste',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      const spy = jest.spyOn(controller, 'create');

      try {
        await controller.create(mockValue);
      } catch (error: any) {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(mockValue);
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(500);
      }
    });
  });

  describe('tests on update method', () => {
    it('should return successfully', async () => {
      const mockValue: UpdateRestaurantDto = {
        cnpj: '11223344',
        description: 'teste',
      };

      const id = '1';

      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        description: 'teste',
        id: 1,
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(controller, 'update');

      const result = await controller.update(id, mockValue);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(id, mockValue);
      expect(result).toBe(mockReturnedValue);
    });

    it('should throws status 500 when fails', async () => {
      const mockValue: CreateRestaurantDto = {
        cnpj: '11223344',
        description: 'teste',
      };

      const id = '1';

      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      const spy = jest.spyOn(controller, 'update');

      try {
        await controller.update(id, mockValue);
      } catch (error: any) {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(id, mockValue);
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(500);
      }
    });
  });

  describe('tests on delete method', () => {
    it('should return successfully', async () => {
      const id = '1';

      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        description: 'teste',
        id: 1,
      };

      jest.spyOn(service, 'remove').mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(controller, 'remove');

      const result = await controller.remove(id);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(id);
      expect(result).toBe(mockReturnedValue);
    });
  });
});
