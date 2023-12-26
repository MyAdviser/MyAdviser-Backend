import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesResolver } from './estudiantes.resolver';

@Module({
  providers: [EstudiantesResolver, EstudiantesService],
})
export class EstudiantesModule {}
