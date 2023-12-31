import { CreateProfesioneInput } from './create-profesiones.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProfesioneInput extends PartialType(CreateProfesioneInput) {
  id: number;
}
