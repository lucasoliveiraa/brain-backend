import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { FarmEntity } from '../entities/farm.entity';

@Injectable()
export class FarmRepository {
  private readonly logger = new Logger(FarmRepository.name);
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async create(createFarmDto: CreateFarmDto): Promise<FarmEntity> {
    try {
      this.logger.log(
        'Criando fazenda createFarmDto: ' + JSON.stringify(createFarmDto),
      );
      const farm = this.manager.create(FarmEntity, {
        ...createFarmDto,
        producer: { id: createFarmDto.producerId },
      });
      return this.manager.save(farm);
    } catch (error) {
      this.logger.error('[DB]Erro ao criar fazenda', error.message);
      throw new InternalServerErrorException(
        error.message || '[DB]Falha ao criar fazenda',
      );
    }
  }

  async findAll(): Promise<FarmEntity[]> {
    try {
      this.logger.log('[DB]Buscando todas as fazendas');
      return this.manager.find(FarmEntity);
    } catch (error) {
      this.logger.error('[DB]Erro ao buscar fazendas', error.message);
      throw new InternalServerErrorException(
        error.message || '[DB]Falha ao buscar fazendas',
      );
    }
  }

  async findOne(id: string): Promise<FarmEntity> {
    try {
      this.logger.log(`[DB]Buscando fazenda com ID: ${id}`);
      const farm = await this.manager.findOne(FarmEntity, { where: { id } });
      if (!farm) {
        throw new NotFoundException(`[DB]Fazenda com ID ${id} não encontrada`);
      }
      return farm;
    } catch (error) {
      this.logger.error(
        `[DB]Erro ao buscar fazenda com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error.message || `[DB]Falha ao buscar fazenda com ID ${id}`,
      );
    }
  }

  async update(
    id: string,
    updateFarmDto: Partial<CreateFarmDto>,
  ): Promise<FarmEntity> {
    try {
      this.logger.log(`[DB]Atualizando fazenda com ID: ${id}`);
      const farm = await this.findOne(id);
      Object.assign(farm, updateFarmDto);
      return this.manager.save(farm);
    } catch (error) {
      this.logger.error(
        `[DB]Erro ao atualizar fazenda com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error.message || `[DB]Falha ao atualizar fazenda com ID ${id}`,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      this.logger.log(`[DB]Removendo fazenda com ID: ${id}`);
      await this.manager.delete(FarmEntity, { id });
      this.logger.log(`[DB]Fazenda com ID ${id} removida com sucesso`);
      return { message: `Fazenda com ID ${id} removida com sucesso` };
    } catch (error) {
      this.logger.error(
        `[DB]Erro ao remover fazenda com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error.message || `[DB]Falha ao remover fazenda com ID ${id}`,
      );
    }
  }
}
