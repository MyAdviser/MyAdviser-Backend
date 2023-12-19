import { CreateUsuarioInput } from './create-usuario.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUsuarioInput extends PartialType(CreateUsuarioInput) {
  id: number;
}
