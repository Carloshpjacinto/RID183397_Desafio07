import { Module } from '@nestjs/common';
import { databaseProviders } from './data-source.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
