import { CreateEstudianteInput } from './create-estudiante.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEstudianteInput extends PartialType(CreateEstudianteInput) {
  id: number;
}
