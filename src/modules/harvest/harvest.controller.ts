import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestEntity } from './entities/harvest.entity';
import { HarvestService } from './harvest.service';

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  @ApiOkResponse({
    description: 'Colheita criada com sucesso.',
    type: HarvestEntity,
  })
  @ApiOperation({
    summary: 'Criar uma nova colheita',
    description: 'Cria uma nova colheita no sistema.',
  })
  create(@Body() createHarvestDto: CreateHarvestDto) {
    return this.harvestService.create(createHarvestDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de colheitas recuperada com sucesso.',
    type: [HarvestEntity],
  })
  @ApiOperation({
    summary: 'Buscar todas as colheitas',
    description: 'Busca uma lista de todas as colheitas cadastradas.',
  })
  findAll() {
    return this.harvestService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Colheita recuperada com sucesso.',
    type: HarvestEntity,
  })
  @ApiOperation({
    summary: 'Buscar uma colheita por ID',
    description: 'Busca uma colheita específica pelo seu ID.',
  })
  findOne(@Param('id') id: string) {
    return this.harvestService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Colheita atualizada com sucesso.',
    type: HarvestEntity,
  })
  @ApiOperation({
    summary: 'Atualizar uma colheita existente',
    description: 'Atualiza uma colheita existente no sistema.',
  })
  update(@Param('id') id: string, @Body() updateHarvestDto: UpdateHarvestDto) {
    return this.harvestService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Colheita removida com sucesso.',
    type: HarvestEntity,
  })
  @ApiOperation({
    summary: 'Remover uma colheita por ID',
    description: 'Remove uma colheita específica pelo seu ID.',
  })
  remove(@Param('id') id: string) {
    return this.harvestService.remove(id);
  }
}
