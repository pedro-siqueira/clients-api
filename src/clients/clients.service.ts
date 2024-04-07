import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'nestjs-prisma';
import { Client } from '.prisma/client';

@Injectable()
export class ClientsService {

  constructor(private readonly prisma: PrismaService) {}

  create(createClientDto: CreateClientDto): Promise<Client> {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  findOne(id: number): Promise<Client> {
    return this.prisma.client.findUniqueOrThrow({ 
      where: { id },
    });
  }

  update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    return this.prisma.client.update({ 
      where: { id },
      data: updateClientDto
    });
  }

  remove(id: number): Promise<Client> {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
