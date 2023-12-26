import { Resolver, Query } from '@nestjs/graphql';
import { ProfesionesService } from './profesiones.service';

@Resolver()
export class ProfesionesResolver {
  constructor(private readonly profesionesService: ProfesionesService) {}

  @Query(() => String)
  getAllProfesion ():string {
    return this.profesionesService.setHi();
  }

}
