import { Field, InputType,Int } from "@nestjs/graphql"
import { GeneroType } from "../entities/estudiante.entity"

@InputType()
export class CreateEstudianteInput {

   @Field(()=>String,{nullable:true})
   PROFILE_ESTUDIANTE?:string

   @Field(()=>String)
   DNI_ESTUDIANTE:string

   @Field(()=>String)
   NOMBRE_ESTUDIANTE:string

   @Field(()=>String)
   CORREO_ESTUDIANTE:string

   @Field(()=>String)
   APELLIDO_ESTUDIANTE:string

   @Field(()=>Int)
	EDAD_ESTUDIANTE:number

   @Field(()=>GeneroType)
	GENERO_ESTUDIANTE:GeneroType

   @Field(()=>String)
	NACIONALIDAD_ESTUDIANTE:string

   @Field(()=>String)
	DIRECCION_ESTUDIANTE:string

   @Field(()=>String)
	PREFERENCIAS_ESTUDIANTE:string

   @Field(()=>Int)
	CICLO_ESTUDIANTE:number

   @Field(()=>String)
	PASSWORD_ESTUDIANTE:string

   @Field(()=>Int)
	universidad_ID_UNI:number

   @Field(()=>Int)
	profesion_ID_PROFESION?:number
}