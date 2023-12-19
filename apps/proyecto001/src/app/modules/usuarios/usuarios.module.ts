import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';

@Module({
  providers: [UsuariosResolver, UsuariosService],
})
export class UsuariosModule {}
