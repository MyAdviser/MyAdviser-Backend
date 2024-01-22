import { Resolver, ObjectType, Field,Mutation,Args} from '@nestjs/graphql';
import Estudiante from './entities/estudiante.entity';
import FieldError from '../FieldError/FielError';
import { EstudianteRepository } from './estudiantes.repository';
import { CreateEstudianteInput } from './dto/create-estudiante.input';
import { UniversidadRepository } from '../universidades/universidades.repository';
import { ProfesionRepository } from '../profesiones/profesiones.repository';
import { emailVerifield } from 'app/utils/emailVerifield';
import { EmailTestVerification } from 'app/utils/emailTestVerification';
import { MailerService } from '@nestjs-modules/mailer';
import { sendVerificationEmail } from 'app/mail';
import { generateToken } from 'app/helpers/tokens';
import bcrypt from 'bcrypt';
import { LoginEstudianteInput } from './dto/login-estudiante.input';
import { setError } from 'app/utils/setError';
import { genJWT } from 'app/utils/jwt';

@ObjectType()
class EstudianteResponseCreate {
  @Field(() => Estudiante,{nullable:true})
  data? : Estudiante | undefined

  @Field(() => String,{nullable:true})
  token? : string | undefined

  @Field(() => [FieldError], {nullable:true})
  errors?: FieldError[]

}

@ObjectType()
class LoginResponse {
  @Field(()=>Estudiante, {nullable:true})
  data?:Estudiante | undefined

  @Field(() => String,{nullable:true})
  token?: string;

  @Field(() => [FieldError], {nullable:true})
  errors?: FieldError[]
}

@Resolver(Estudiante)
export class EstudiantesResolver {
  constructor(
    private readonly mailService: MailerService
    ){}
  repository = EstudianteRepository
  
  @Mutation(() => EstudianteResponseCreate)
  async registerEstudiante(
    @Args('input', { type: () => CreateEstudianteInput }) input: CreateEstudianteInput
    ): Promise<EstudianteResponseCreate> {
    try {
      const { CORREO_ESTUDIANTE,universidad_ID_UNI,profesion_ID_PROFESION,NOMBRE_ESTUDIANTE,PASSWORD_ESTUDIANTE } = input;
      const newId = await this.repository.newId();
      emailVerifield(CORREO_ESTUDIANTE);
      const emailExist = await EmailTestVerification(CORREO_ESTUDIANTE);
      if(!emailExist) return {
        errors:[
          {
            field: 'Error',
            message: `El correo esta incorrecto o no existe.`
          }
        ] 
      }
      const avatar = 'https://res.cloudinary.com/djbbxqxvj/image/upload/v1703259201/My%20Adviser/avatar/avatar.jpg';
      const existIdUni = await UniversidadRepository.find({where:{ID_UNI:universidad_ID_UNI}});
      const existIdProf = await ProfesionRepository.find({where:{ID_PROFESION:profesion_ID_PROFESION}});
      if(existIdProf.length === 0 || existIdUni.length === 0) return {
        errors: [
          {
            field: 'Error',
            message: `El ID ${input.profesion_ID_PROFESION} de profesion no existe o El ID ${input.universidad_ID_UNI} de universidad no existe.`
          }
        ]
      };
      const salt   = await bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hashSync(PASSWORD_ESTUDIANTE, salt);
      const newUser = await this.repository.insert({
        ID_ESTUDIANTE:newId,
        ...input,
        PASSWORD_ESTUDIANTE:hashedPassword,
        ESTADO_ASESOR:false,
        PROFILE_ESTUDIANTE:avatar,
      });
      const idStudent = newUser.generatedMaps.map(i => i.ID_ESTUDIANTE).toString()
      const emailVerificationToken = generateToken(
        { id:idStudent},
        "24h"
      );
      const token = generateToken({ id: idStudent }, "7d");
      const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
      const mailOptions = await sendVerificationEmail(CORREO_ESTUDIANTE,NOMBRE_ESTUDIANTE,url);
      await this.mailService.sendMail(mailOptions);
      return {data:{...input,ID_ESTUDIANTE:parseInt(idStudent)},token};
    } catch (error) {
      return {
        errors: [
          {
            field: 'Hubo un error al crear Estudiante :',
            message: ` ${error}`,
          }
        ]
      }     
    }
  }


  @Mutation(()=>LoginResponse)
  async loginEstudiante(
    @Args('input')input:LoginEstudianteInput 
  ):Promise<LoginResponse>{
    try { 
      const {EMAIL_ESTUDIANTE,PASSWORD} = input;
      const existUser = await this.repository.find({where:{CORREO_ESTUDIANTE:EMAIL_ESTUDIANTE}}).then((data)=>data?.pop());
      if(!existUser) return setError('LOGIN','El correo o la contraseña son incorrectos.');
      const isSamePass = await bcrypt.compareSync(PASSWORD,existUser.PASSWORD_ESTUDIANTE);
      if(!isSamePass) return setError('LOGIN','El contraseña son incorrectos.');
      const token = await genJWT(existUser.ID_ESTUDIANTE);
      return {data:{...existUser, PASSWORD_ESTUDIANTE:''},token}
    } catch(error){
      return {
        errors : [
          {
            field:'LOGIN',
            message:'Contacte con el administrador.'
          }
        ]
      }
    }
  }
}
