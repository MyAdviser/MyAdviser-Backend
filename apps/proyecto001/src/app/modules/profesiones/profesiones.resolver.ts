import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class ProfesionesResolver {

  @Query(() => String)
  getAllProfesion ():string {
    return "hola";
  }

}
