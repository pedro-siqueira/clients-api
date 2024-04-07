import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaService } from 'nestjs-prisma';

const mockClients = [
  {
    id: 1,
    name: "João",
    email: "joao@joao.com",
    birthdate: "1991-01-01T00:00:00.000Z",
    phone: '11911111111',
    cpf: '404.982.270-90',
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@maria.com",
    birthdate: "1992-02-02T00:00:00.000Z",
    phone: '11922222222',
    cpf: '363.862.450-16',
  },
  {
    id: 3,
    name: "José",
    email: "jose@jose.com",
    birthdate: "1993-03-03T00:00:00.000Z",
    phone: '11933333333',
    cpf: '269.332.180-82',
  },
]

const prismaMock = {
  client: {
    create: jest.fn().mockReturnValue(mockClients[0]),
    findMany: jest.fn().mockResolvedValue(mockClients),
    findUniqueOrThrow: jest.fn().mockResolvedValue(mockClients[0]),
    update: jest.fn().mockResolvedValue(mockClients[0]),
    delete: jest.fn(),
  }
}

describe('ClientsService', () => {
  let service: ClientsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new client', () => {
      const response = service.create(mockClients[0]);

      expect(response).toBe(mockClients[0]);
      expect(prisma.client.create).toHaveBeenCalledTimes(1);
      expect(prisma.client.create).toHaveBeenCalledWith({
        data: mockClients[0],
      });
    });
  });

  describe('findAll', () => {
    it('should find all the clients', async () => {
      const response = await service.findAll();

      expect(response).toEqual(mockClients);
      expect(prisma.client.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.client.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should find the client with the matching id', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(mockClients[0]);
      expect(prisma.client.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      expect(prisma.client.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should throw error when client id isn't found`, async () => {
      jest.spyOn(prisma.client, 'findUniqueOrThrow').mockRejectedValue(new Error());

      try {
        await service.findOne(4);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.client.findUniqueOrThrow).toHaveBeenCalledTimes(1);
      expect(prisma.client.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 4 },
      });
    });
  });

  describe('update', () => {
    it('should update client with matching id', async () => {
      const response = await service.update(1, mockClients[0]);

      expect(response).toEqual(mockClients[0]);
      expect(prisma.client.update).toHaveBeenCalledTimes(1);
      expect(prisma.client.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockClients[0],
      });
    });

    it(`should throw error when client id isn't found`, async () => {
      const unregisteredClient = {
        id: 4,
        name: "Abigail",
        email: "abigail@abigailjose.com",
        birthdate: "1994-04-04T00:00:00.000Z",
        phone: '11944444444',
        cpf: '424.902.320-61',
      }

      jest.spyOn(prisma.client, 'update').mockRejectedValue(new Error());

      try {
        await service.update(4, unregisteredClient);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.client.update).toHaveBeenCalledTimes(1);
      expect(prisma.client.update).toHaveBeenCalledWith({
        where: { id: 4 },
        data: unregisteredClient,
      });

    });
  });

  describe('delete', () => {
    it('should delete client with matching id', async () => {
      const response = await service.remove(4);

      expect(response).toBeUndefined();
      expect(prisma.client.delete).toHaveBeenCalledTimes(1);
      expect(prisma.client.delete).toHaveBeenCalledWith({
        where: { id: 4 },
      });
    });

    it(`should throw error when client id isn't found`, async () => {
      jest.spyOn(prisma.client, 'delete').mockRejectedValue(new Error());

      try {
        await service.remove(4);
      } catch (error) {
        expect(error).toEqual(new Error());
      }

      expect(prisma.client.delete).toHaveBeenCalledTimes(1);
      expect(prisma.client.delete).toHaveBeenCalledWith({
        where: { id: 4 },
      });
    });
  });
});
