import { Module } from '@nestjs/common';
import { ProfesionesService } from './profesiones.service';
import { ProfesionesResolver } from './profesiones.resolver';

@Module({
  providers: [ProfesionesResolver, ProfesionesService],
})
export class ProfesionesModule {}
