import { Module } from '@nestjs/common';
import { EstudiantesResolver } from './estudiantes.resolver';

@Module({
  providers: [EstudiantesResolver],
})
export class EstudiantesModule {}
