import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { DatabaseModule } from './shared/database/database.module';
import { FarmModule } from './modules/farm/farm.module';
import { HarvestModule } from './modules/harvest/harvest.module';
import { CultureModule } from './modules/culture/culture.module';

@Module({
  imports: [DatabaseModule, ProducerModule, FarmModule, HarvestModule, CultureModule],
})
export class AppModule {}
