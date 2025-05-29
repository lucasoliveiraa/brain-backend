import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { ProducerEntity } from '../entities/producer.entity';

@Injectable()
export class ProducerRepository {
  private readonly logger = new Logger(ProducerRepository.name);
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async create(createProducerDto: CreateProducerDto) {
    try {
      this.logger.log(
        'Creating producer with data: ' + JSON.stringify(createProducerDto),
      );
      const existingProducer = await this.manager.findOne(ProducerEntity, {
        where: { cpfCnpj: createProducerDto.cpfCnpj },
        withDeleted: true, // Include deleted records in the search
      });

      if (existingProducer) {
        this.logger.warn(
          `Producer with CPF/CNPJ ${createProducerDto.cpfCnpj} already exists.`,
        );
        throw new BadRequestException(
          `Producer with CPF/CNPJ ${createProducerDto.cpfCnpj} already exists.`,
        );
      }

      const producer = this.manager.create(ProducerEntity, createProducerDto);
      return this.manager.save(producer);
    } catch (error) {
      this.logger.error('Error creating producer', error.message);
      throw new BadRequestException(
        error.message || 'Failed to create producer',
      );
    }
  }

  async findAll() {
    try {
      this.logger.log('Fetching all producers');
      return this.manager.find(ProducerEntity);
    } catch (error) {
      this.logger.error('Error fetching producers', error.message);
      throw new BadRequestException('Failed to fetch producers');
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Fetching producer with id: ${id}`);
      const producer = await this.manager.findOne(ProducerEntity, {
        where: { id },
      });
      if (!producer) {
        throw new BadRequestException(`Producer with id ${id} not found`);
      }
      return producer;
    } catch (error) {
      this.logger.error(`Error fetching producer with id ${id}`, error.message);
      throw new BadRequestException(`Failed to fetch producer with id ${id}`);
    }
  }

  async update(id: string, updateProducerDto: Partial<CreateProducerDto>) {
    try {
      this.logger.log(`Updating producer with id: ${id}`);
      const producer = await this.findOne(id);
      Object.assign(producer, updateProducerDto);
      return this.manager.save(producer);
    } catch (error) {
      this.logger.error(`Error updating producer with id ${id}`, error.message);
      throw new BadRequestException(`Failed to update producer with id ${id}`);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`Removing producer with id: ${id}`);
      const producer = await this.findOne(id);
      await this.manager.update(ProducerEntity, id, {
        deletedAt: new Date(),
        isDeleted: true,
      });
      return { message: `Producer with id ${id} removed successfully` };
    } catch (error) {
      this.logger.error(`Error removing producer with id ${id}`, error.message);
      throw new BadRequestException(`Failed to remove producer with id ${id}`);
    }
  }
}
