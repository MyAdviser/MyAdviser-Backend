import { Resolver } from '@nestjs/graphql';

@Resolver('Universidade')
export class UniversidadesResolver {

  sayHello(){
    return true;
  }
}
