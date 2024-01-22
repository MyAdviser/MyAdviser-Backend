import { CreateAsesoreInput } from './create-asesore.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAsesoreInput extends PartialType(CreateAsesoreInput) {
  id: number;
}
