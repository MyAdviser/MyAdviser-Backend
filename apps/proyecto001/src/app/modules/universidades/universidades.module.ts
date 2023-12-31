import { Module } from '@nestjs/common';
import { UniversidadesResolver } from './universidades.resolver';

@Module({
  providers: [UniversidadesResolver],
})
export class UniversidadesModule {}
