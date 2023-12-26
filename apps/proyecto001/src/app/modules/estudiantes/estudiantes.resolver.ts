import { Resolver, ObjectType, Field,Mutation,Args,Query} from '@nestjs/graphql';
import Estudiante from './entities/estudiante.entity';
import FieldError from '../FieldError/FielError';
import { EstudianteRepository } from './estudiantes.repository';
import { CreateEstudianteInput } from './dto/create-estudiante.input';
import { UniversidadRepository } from '../universidades/universidades.repository';
import { ProfesionesService } from '../profesiones/profesiones.service';

@ObjectType()
class EstudianteResponseCreate {
  @Field(() => Estudiante,{nullable:true})
  data? : Estudiante | undefined

  @Field(() => [FieldError], {nullable:true})
  errors?: FieldError[]

}

@Resolver(Estudiante)
export class EstudiantesResolver {
  repository = EstudianteRepository
  constructor(private readonly profesionService:ProfesionesService){}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => EstudianteResponseCreate)
  async createEstudiante(@Args('input', { type: () => CreateEstudianteInput }) input: CreateEstudianteInput): Promise<EstudianteResponseCreate> {
    try {
      const newId = await this.repository.newId();
      const avatar = 'https://res.cloudinary.com/djbbxqxvj/image/upload/v1703259201/My%20Adviser/avatar/avatar.jpg';
      const existIdUni = UniversidadRepository.find({where:{ID_UNI:input.universidad_ID_UNI}});
      const existIdProf = this.profesionService.findOne(input.profesion_ID_PROFESION!);
      if(!existIdUni || !existIdProf) return {
        errors: [
          {
            field: 'Error',
            message: `El ID ${input.universidad_ID_UNI} no existe.`
          }
        ]
      } 
      await this.repository.insert({
        ID_ESTUDIANTE:newId,
        ...input,
        ESTADO_ASESOR:false,
        PROFILE_ESTUDIANTE:avatar,
      });

      return {data:input};
    } catch (error) {
      return {
        errors: [
          {
            field: 'Estudiante Error',
            message: `Hubo un error al crear Estudiante : ${error}`
          }
        ]
      }     
    }
  }
}
