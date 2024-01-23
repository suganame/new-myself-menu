import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { RestaurantEntity } from './entities/restaurant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RestaurantService', () => {
  let service: RestaurantService;

  let repository: Repository<RestaurantEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(RestaurantEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<Repository<RestaurantEntity>>(
      getRepositoryToken(RestaurantEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockReturnedValue);
      const spy = jest.spyOn(service, 'findAll');

      const result = await service.findAll();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockReturnedValue);
    });
  });

  describe('tests on findOne method', () => {
    it('should return successfully', async () => {
      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        id: 1,
        description: 'teste',
      };

      const spyRepository = jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(service, 'findOne');

      const result = await service.findOne(1);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1);
      expect(spyRepository).toHaveBeenCalledWith({ id: 1 });
      expect(result).toBe(mockReturnedValue);
    });

    it('should throws and error 404 when register not found', async () => {
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(
          new HttpException('Not Found', HttpStatus.NOT_FOUND),
        );

      const spy = jest.spyOn(service, 'findOne');

      try {
        await service.findOne(1);
      } catch (error: any) {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(1);
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toBe(404);
      }
    });
  });

  describe('tests on update method', () => {
    it('should return successfully', async () => {
      const mockValue: UpdateRestaurantDto = {
        cnpj: '11223344',
        description: 'teste',
      };

      const id = 1;

      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        description: 'teste',
        id: 1,
      };

      const mockUpdateReturnedValue: UpdateResult = {
        raw: [],
        affected: 1,
        generatedMaps: [],
      };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(mockUpdateReturnedValue);

      const spy = jest.spyOn(service, 'update');

      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockResolvedValueOnce(mockReturnedValue);

      const result = await service.update(id, mockValue);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      // expect(spyRepository).toHaveBeenCalledWith(id, mockValue);
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

      const spyRepository = jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(service, 'create');

      const result = await service.create(mockValue);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith(mockValue);
      expect(result).toBe(mockReturnedValue);
    });
  });

  describe('tests on delete method', () => {
    it('should return successfully', async () => {
      const mockReturnedValue: RestaurantEntity = {
        cnpj: '11223344',
        description: 'teste',
        id: 1,
      };

      const id = 1;

      const spyRepository = jest
        .spyOn(repository, 'softRemove')
        .mockResolvedValueOnce(mockReturnedValue);

      const spy = jest.spyOn(service, 'remove');

      const result = await service.remove(id);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({ id });
      expect(result).toBe(mockReturnedValue);
    });
  });
});
