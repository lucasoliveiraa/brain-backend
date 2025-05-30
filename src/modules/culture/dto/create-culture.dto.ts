import { ApiProperty } from '@nestjs/swagger';

export class CreateCultureDto {
  @ApiProperty({
    description: 'Nome da cultura',
    type: 'string',
    example: 'Soja',
    required: true,
  })
  name: string;
}
