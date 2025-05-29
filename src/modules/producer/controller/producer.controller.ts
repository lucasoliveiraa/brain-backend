import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { ProducerEntity } from '../entities/producer.entity';
import { ProducerService } from '../service/producer.service';

@ApiTags('Producer')
@ApiBearerAuth('access-token')
@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOkResponse({
    description: 'Producer created successfully.',
    type: ProducerEntity,
  })
  @ApiOperation({
    summary: 'Create a new producer',
    description: 'Creates a new producer with the provided details.',
  })
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all producers.',
    type: [ProducerEntity],
  })
  @ApiOperation({
    summary: 'Get all producers',
    description: 'Retrieves a list of all producers in the system.',
  })
  findAll() {
    return this.producerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Producer details retrieved successfully.',
    type: ProducerEntity,
  })
  @ApiOperation({
    summary: 'Get a producer by ID',
    description: 'Retrieves the details of a specific producer by their ID.',
  })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Producer updated successfully.',
    type: ProducerEntity,
  })
  @ApiOperation({
    summary: 'Update a producer',
    description: 'Updates the details of an existing producer.',
  })
  update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Producer deleted successfully.',
    type: String,
  })
  @ApiOperation({
    summary: 'Delete a producer',
    description: 'Deletes a specific producer by their ID.',
  })
  remove(@Param('id') id: string) {
    return this.producerService.remove(id);
  }
}
