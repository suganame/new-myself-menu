import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantService],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('tests on findAll method', () => {
    it('should return successfully', () => {
      const mockedValue = [10, 20, 30];

      jest.spyOn(service, 'findAll').mockReturnValueOnce(mockedValue);

      const result = service.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockedValue);
    });

    // it('should throws an error', () => {
    //   jest
    //     .spyOn(service, 'findOne')
    //     .mockReturnValueOnce(new Error('Mock error'));
    //   expect(controller.findOne).toThrow();
    // });
  });
});
