import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({
    description: 'Nome da safra',
    example: 'Safra 2023',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Ano da colheita',
    example: 2023,
    required: true,
  })
  @IsNumber()
  @IsPositive({ message: 'O ano deve ser um número positivo.' })
  @IsNotEmpty({ message: 'O ano é obrigatório.' })
  year: number;

  @ApiProperty({
    description: 'ID da fazenda associada à colheita',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  farmId: string;
}
