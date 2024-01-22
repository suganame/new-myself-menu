import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService],
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
    it('should return successfully', () => {
      const mockedValue = 20;

      jest.spyOn(service, 'findOne').mockReturnValueOnce(mockedValue);

      const spy = jest.spyOn(controller, 'findOne');

      const result = controller.findOne({ id: 20 });

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: 20 });
      expect(result).toBe(mockedValue);
    });

    it('should throws an error', () => {
      jest
        .spyOn(service, 'findOne')
        .mockReturnValueOnce(new Error('Mock error'));

      const spy = jest.spyOn(controller, 'findOne');
      controller.findOne({ id: 20 });

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: 20 });
      expect(spy).toThrow();
    });
  });

  describe('tests on findAll method', () => {
    it('should return successfully', () => {
      const mockedValue = [10, 20, 30];

      jest.spyOn(service, 'findAll').mockReturnValueOnce(mockedValue);

      const result = controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockedValue);
    });

    it('should throws an error', () => {
      jest
        .spyOn(service, 'findOne')
        .mockReturnValueOnce(new Error('Mock error'));

      const spy = jest.spyOn(controller, 'findAll');
      controller.findAll();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toThrow();
    });
  });
});
