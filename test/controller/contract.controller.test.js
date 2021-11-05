const { ContractRepository } = require('../../src/repository');
const { ContractController } = require('../../src/controller');

const OLD_ENV = process.env;

describe('ContractController', () => {
  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  describe('findOne', () => {
    it('should find a contract and return it', async () => {
     const req = { profile: {}, params: { id: '2' }};
     let res = {
       status: jest.fn().mockImplementation(() => res),
       json: jest.fn().mockImplementation(() => res)
     };
     const contract = {
       id: 1,
       terms: 'bla bla bla',
       status: 'in_progress',
       ClientId: 2,
       ContractorId: 6
     };

     ContractRepository.findOne = jest.fn().mockImplementation(() => contract);

     await ContractController.findOne(req, res);

     expect(res.status).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith(contract);
   });

    it('should not find a contract and return 404', async () => {
     const req = { profile: {}, params: { id: '2' }};
     let res = {
       status: jest.fn().mockImplementation(() => res),
       json: jest.fn().mockImplementation(() => res)
     }

     ContractRepository.findOne = jest.fn().mockImplementation(() => null);

     await ContractController.findOne(req, res);

     expect(res.status).toHaveBeenCalledWith(404);
     expect(res.json).toHaveBeenCalledWith({
       message: 'The contract doesn\'t exist or does not belong to you'
     });
   });

    it('should throw an error at repository lvl and return 500 with a generic message', async () => {
     const req = { profile: {}, params: { id: '2' }};
     let res = {
       status: jest.fn().mockImplementation(() => res),
       json: jest.fn().mockImplementation(() => res)
     };

     ContractRepository.findOne = jest.fn().mockImplementation(() => {
       throw new Error('err');
     });

     await ContractController.findOne(req, res);

     expect(res.status).toHaveBeenCalledWith(500);
     expect(res.json).toHaveBeenCalledWith({ message: 'An error has occurred while processing the request' });
   });

    it('should throw an error at repository lvl and return 500 with the repository err message', async () => {
      process.env.NODE_ENV = 'development';

      const req = { profile: {}, params: { id: '2' }};
      let res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn().mockImplementation(() => res)
      };

      ContractRepository.findOne = jest.fn().mockImplementation(() => {
        throw new Error('test');
      });

      await ContractController.findOne(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'test' });
    });
  });

  describe('findAll', () => {
    it('should find multiple contracts and return them', async () => {
      const req = { profile: {}, params: { id: '2' }};
      let res = {
        status: jest.fn().mockImplementationOnce(() => res),
        json: jest.fn().mockImplementationOnce(() => res)
      };
      const contractOne = {
        id: 1,
        terms: 'bla bla bla',
        status: 'in_progress',
        ClientId: 2,
        ContractorId: 6
      };
      const contractTwo = {
        id: 2,
        terms: 'bla bla bla 2',
        status: 'in_progress',
        ClientId: 2,
        ContractorId: 6
      };

      ContractRepository.findAll = jest.fn().mockImplementationOnce(() => [contractOne, contractTwo]);

      await ContractController.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([contractOne, contractTwo]);
    });

    it('should throw an error at repository lvl and return 500 with a generic message', async () => {
      const req = { profile: {}, params: { id: '2' }};
      let res = {
        status: jest.fn().mockImplementationOnce(() => res),
        json: jest.fn().mockImplementationOnce(() => res)
      };
      const contract = {
        id: 1,
        terms: 'bla bla bla',
        status: 'in_progress',
        ClientId: 2,
        ContractorId: 6
      };

      ContractRepository.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error('err');
      });

      await ContractController.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'An error has occurred while processing the request' });
    });

    it('should throw an error at repository lvl and return 500 with the repository err message', async () => {
      process.env.NODE_ENV = 'development';

      const req = { profile: {}, params: { id: '2' }};
      let res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn().mockImplementation(() => res)
      };

      ContractRepository.findAll = jest.fn().mockImplementation(() => {
        throw new Error('test');
      });

      await ContractController.findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'test' });
    });
  });
});
