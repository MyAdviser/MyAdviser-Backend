import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UsuariosResolver {

  // @Mutation('createUsuario')
  // create(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
  //   return this.usuariosService.create(createUsuarioInput);
  // }

  @Query( () => Boolean )
  findAll():boolean {
    return true;
  }

  // @Query('usuario')
  // findOne(@Args('id') id: number) {
  //   return this.usuariosService.findOne(id);
  // }

  // @Mutation('updateUsuario')
  // update(@Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput) {
  //   return this.usuariosService.update(updateUsuarioInput.id, updateUsuarioInput);
  // }

  // @Mutation('removeUsuario')
  // remove(@Args('id') id: number) {
  //   return this.usuariosService.remove(id);
  // }   
}
