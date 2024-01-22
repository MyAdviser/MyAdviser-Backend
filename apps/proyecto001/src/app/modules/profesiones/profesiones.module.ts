import { Module } from '@nestjs/common';
import { ProfesionesResolver } from './profesiones.resolver';

@Module({
  providers: [ProfesionesResolver],
})
export class ProfesionesModule {}
