import { Resolver, ObjectType, Field,Mutation,Args, Context} from '@nestjs/graphql';
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
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common';
import { ApolloContext } from 'app/interface';
import { UseMiddleware } from 'type-graphql';
import { isAuth } from 'app/middleware/isAuth';

@ObjectType()
class EstudianteResponseCreate {
  @Field(() => Estudiante,{nullable:true})
  data? : Estudiante | undefined

  @Field(() => String,{nullable:true})
  token? : string | undefined

  @Field(() => [FieldError], {nullable:true})
  errors?: FieldError[]

}

@Resolver(Estudiante)
export class EstudiantesResolver {
  constructor(private readonly mailService: MailerService){}
  repository = EstudianteRepository
  
  @Mutation(() => EstudianteResponseCreate)
  async createEstudiante(
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
      return {data:input,token};
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

  // esta funcion es cuando el usuaroi este inciado sesion, por lo que se genero el token.
  @UseMiddleware(isAuth)
  @Mutation(() => String)
  async activateAccount(
    @Args('token', { type: () => String }) token: string,
    @Context() { req }: ApolloContext
  ): Promise<string> {
    try {
      const id = req.userId;
      // const user = jwt.verify(token, process.env.TOKEN_SECRET!);
      const user = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
      const check = await this.repository.find({where:{ID_ESTUDIANTE:id}});
      if (id !== user.id) {
        throw { message: 'No tienes la autorización para completar esta operación.', statusCode: HttpStatus.BAD_REQUEST };
      }
      const verification = check.map(i => i.VERIFICACION)
      if (verification) {
        throw { message: 'This email is already activated.', statusCode: HttpStatus.BAD_REQUEST };
      } else {
        if (id !== undefined) {
          await this.repository.update(id, { VERIFICACION: true });
        }
        return 'Account has been activated successfully.';
      }
    } catch (error) {
      throw { message: error.message, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

}
