import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { HarvestEntity } from '../entities/harvest.entity';

export class HarvestRepository {
  private readonly logger = new Logger(HarvestRepository.name);
  constructor(@InjectEntityManager() private readonly manager: EntityManager) {}

  async create(createHarvestDto: CreateHarvestDto): Promise<HarvestEntity> {
    try {
      this.logger.log(
        'Criando colheita createHarvestDto: ' +
          JSON.stringify(createHarvestDto),
      );
      const harvest = this.manager.create(HarvestEntity, {
        ...createHarvestDto,
        farm: { id: createHarvestDto.farmId },
      });
      return await this.manager.save(harvest);
    } catch (error) {
      this.logger.error('[DB]Erro ao criar colheita', error.message);
      throw new InternalServerErrorException(
        error.message || '[DB]Falha ao criar colheita',
      );
    }
  }

  async findAll(): Promise<HarvestEntity[]> {
    try {
      this.logger.log('[DB]Buscando todas as colheitas');
      return await this.manager.find(HarvestEntity);
    } catch (error) {
      this.logger.error('[DB]Erro ao buscar colheitas', error.message);
      throw new InternalServerErrorException(
        error.message || '[DB]Falha ao buscar colheitas',
      );
    }
  }

  async findOne(id: string): Promise<HarvestEntity> {
    try {
      this.logger.log(`[DB]Buscando colheita com ID: ${id}`);
      const harvest = await this.manager.findOne(HarvestEntity, {
        where: { id },
      });
      if (!harvest) {
        throw new NotFoundException(`[DB]Colheita com ID ${id} não encontrada`);
      }
      return harvest;
    } catch (error) {
      this.logger.error(
        `[DB]Erro ao buscar colheita com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error.message || `[DB]Falha ao buscar colheita com ID ${id}`,
      );
    }
  }

  async update(
    id: string,
    updateHarvestDto: Partial<UpdateHarvestDto>,
  ): Promise<HarvestEntity> {
    try {
      this.logger.log(
        `[DB]Atualizando colheita com ID: ${id} updateHarvestDto: ${JSON.stringify(updateHarvestDto)}`,
      );
      const harvest = await this.findOne(id);
      if (!harvest) {
        throw new NotFoundException(`[DB]Colheita com ID ${id} não encontrada`);
      }
      Object.assign(harvest, updateHarvestDto);
      return await this.manager.save(harvest);
    } catch (error) {
      this.logger.error(
        `[DB]Erro ao atualizar colheita com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error.message || `[DB]Falha ao atualizar colheita com ID ${id}`,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      this.logger.log(`[DB]Removendo colheita com ID: ${id}`);
      await this.manager.delete(HarvestEntity, { id });
      this.logger.log(`[DB]Colheita com ID ${id} removida com sucesso`);
      return { message: `Colheita com ID ${id} removida com sucesso` };
    } catch (error) {
      this.logger.error(
        `[DB]Erro ao remover colheita com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error.message || `[DB]Falha ao remover colheita com ID ${id}`,
      );
    }
  }
}
