import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { ProducerRepository } from '../repositories/producer.repository';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(private readonly producerRepository: ProducerRepository) {}

  create(createProducerDto: CreateProducerDto) {
    try {
      return this.producerRepository.create(createProducerDto);
    } catch (error) {
      this.logger.error('Error creating producer', error);
      throw new HttpException(
        error?.message || 'Failed to create producer',
        500,
      );
    }
  }

  findAll() {
    try {
      return this.producerRepository.findAll();
    } catch (error) {
      this.logger.error('Error fetching producers', error);
      throw new HttpException('Failed to fetch producers', 500);
    }
  }

  findOne(id: string) {
    try {
      return this.producerRepository.findOne(id);
    } catch (error) {
      this.logger.error(`Error fetching producer with id ${id}`, error);
      throw new HttpException(`Failed to fetch producer with id ${id}`, 500);
    }
  }

  update(id: string, updateProducerDto: UpdateProducerDto) {
    try {
      return this.producerRepository.update(id, updateProducerDto);
    } catch (error) {
      this.logger.error(`Error updating producer with id ${id}`, error);
      throw new HttpException(`Failed to update producer with id ${id}`, 500);
    }
  }

  remove(id: string) {
    try {
      return this.producerRepository.remove(id);
    } catch (error) {
      this.logger.error(`Error removing producer with id ${id}`, error);
      throw new HttpException(`Failed to remove producer with id ${id}`, 500);
    }
  }
}
