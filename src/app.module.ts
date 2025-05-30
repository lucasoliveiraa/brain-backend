import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { DatabaseModule } from './shared/database/database.module';
import { FarmModule } from './modules/farm/farm.module';
import { HarvestModule } from './modules/harvest/harvest.module';
import { CultureModule } from './modules/culture/culture.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [DatabaseModule, ProducerModule, FarmModule, HarvestModule, CultureModule, DashboardModule, HealthCheckModule],
})
export class AppModule {}
