import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';

// Mock do PrismaService
const mockPrismaService = {
  tb_com_cliente: {
    findMany: jest
      .fn()
      .mockResolvedValue([{ BIN_CODCLI: 1n, VCH_NOMCLI: 'Cliente Teste' }]),
  },
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('listarClientes', () => {
    it('should return an array of clients', async () => {
      const result = await appController.listarClientes();
      expect(result).toEqual([{ BIN_CODCLI: 1n, VCH_NOMCLI: 'Cliente Teste' }]);
      expect(mockPrismaService.tb_com_cliente.findMany).toHaveBeenCalled();
    });
  });
});
