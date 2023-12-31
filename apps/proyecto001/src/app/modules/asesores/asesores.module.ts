import { Module } from '@nestjs/common';
import { AsesoresResolver } from './asesores.resolver';

@Module({
  providers: [AsesoresResolver],
})
export class AsesoresModule {}
