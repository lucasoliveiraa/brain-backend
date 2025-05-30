import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { DatabaseModule } from './shared/database/database.module';
import { FarmModule } from './modules/farm/farm.module';

@Module({
  imports: [DatabaseModule, ProducerModule, FarmModule],
})
export class AppModule {}
