import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestRepository } from './respositories/harvest.repository';

@Injectable()
export class HarvestService {
  private readonly logger = new Logger(HarvestService.name);

  constructor(private readonly harvestRepository: HarvestRepository) {}

  create(createHarvestDto: CreateHarvestDto) {
    try {
      this.logger.log('Criando uma nova colheita', createHarvestDto);
      return this.harvestRepository.create(createHarvestDto);
    } catch (error) {
      this.logger.error('Erro ao criar colheita', error.message);
      throw new InternalServerErrorException(
        error?.message || 'Falha ao criar colheita',
      );
    }
  }

  findAll() {
    try {
      this.logger.log('Buscando todas as colheitas');
      return this.harvestRepository.findAll();
    } catch (error) {
      this.logger.error('Erro ao buscar colheitas', error.message);
      throw new InternalServerErrorException(
        error?.message || 'Falha ao buscar colheitas',
      );
    }
  }

  findOne(id: string) {
    try {
      this.logger.log(`Buscando colheita com ID: ${id}`);
      return this.harvestRepository.findOne(id);
    } catch (error) {
      this.logger.error(`Erro ao buscar colheita com ID ${id}`, error.message);
      throw new InternalServerErrorException(
        error?.message || `Falha ao buscar colheita com ID ${id}`,
      );
    }
  }

  update(id: string, updateHarvestDto: UpdateHarvestDto) {
    try {
      this.logger.log(`Atualizando colheita com ID: ${id}`, updateHarvestDto);
      return this.harvestRepository.update(id, updateHarvestDto);
    } catch (error) {
      this.logger.error(
        `Erro ao atualizar colheita com ID ${id}`,
        error.message,
      );
      throw new InternalServerErrorException(
        error?.message || `Falha ao atualizar colheita com ID ${id}`,
      );
    }
  }

  remove(id: string) {
    try {
      this.logger.log(`Removendo colheita com ID: ${id}`);
      const harvest = this.findOne(id);
      if (!harvest) {
        throw new NotFoundException(`Colheita com ID ${id} não encontrada`);
      }
      return this.harvestRepository.remove(id);
    } catch (error) {
      this.logger.error(`Erro ao remover colheita com ID ${id}`, error.message);
      throw new InternalServerErrorException(
        error?.message || `Falha ao remover colheita com ID ${id}`,
      );
    }
  }
}
