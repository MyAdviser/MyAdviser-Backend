import { Resolver } from '@nestjs/graphql';

@Resolver('Asesore')
export class AsesoresResolver {
  // constructor(private readonly asesoresService: AsesoresService) {}

  getAll(){
    return true;
  }
}
