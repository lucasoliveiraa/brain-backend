import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [DatabaseModule, ProducerModule],
})
export class AppModule {}
