import { CreateUniversidadeInput } from './create-universidade.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUniversidadeInput extends PartialType(CreateUniversidadeInput) {
  id: number;
}
