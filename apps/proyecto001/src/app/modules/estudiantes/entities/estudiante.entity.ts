import { Field,Int, registerEnumType,ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

export enum GeneroType {
   HOMBRE="HOMBRE",
   MUJER="MUJER",
}
registerEnumType(GeneroType,{
   name : "GeneroType",
   description:"Tipo de genero para el Estudiante"
})

@Entity({
   synchronize:true,
   schema:'MY_ADVISER',
   name:'ESTUDIANTE'
})
@ObjectType()
export default class Estudiante {

   @Field(()=>Int)
   @PrimaryColumn()
   ID_ESTUDIANTE?:number

   @Field(()=>String)
   @Column()
   PROFILE_ESTUDIANTE?:string

   @Field(()=>String)
   @Column()
   DNI_ESTUDIANTE:string

   @Field(()=>String)
   @Column()
   CORREO_ESTUDIANTE:string

   @Field(()=>String)
   @Column()
   NOMBRE_ESTUDIANTE:string

   @Field(()=>String)
   @Column()
   APELLIDO_ESTUDIANTE:string

   @Field(()=>Int)
   @Column()
	EDAD_ESTUDIANTE:number

   @Field(()=>GeneroType)
   @Column()
	GENERO_ESTUDIANTE:GeneroType


   @Field(()=>String)
   @Column()
	NACIONALIDAD_ESTUDIANTE:string

   @Field(()=>String)
   @Column()
	DIRECCION_ESTUDIANTE:string

   @Field(()=>Boolean)
   @Column()
	ESTADO_ASESOR?:boolean

   @Field(()=>String)
   @Column()
	PREFERENCIAS_ESTUDIANTE:string

   @Field(()=>Int)
   @Column()
	CICLO_ESTUDIANTE:number

   @Field(()=>String)
   @Column()
	PASSWORD_ESTUDIANTE:string

   @Field(()=>Boolean)
   @Column()
	VERIFICACION?:boolean = false

   @Field(()=>Int)
   @Column()
	universidad_ID_UNI:number

   @Field(()=>Int)
   @Column()
	profesion_ID_PROFESION?:number
	// ID_UNI (ID DE LA TABLA UNIVERSIDAD) (1 - 1)
	// - ID_PROFESION (ID DE LA TABLA PROFESION) (1 - 1)
	// - ID_ASESOR (ID DE LA TABLA DE ASESORES) (1 -1 )

}
