import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
   synchronize:false,
   schema:'myadviser',
   name:'ASESOR'
})
@ObjectType()
export class Asesor {

   @Field(()=>Int)
   @PrimaryColumn()
   ID_ASESOR:number

   @Field(()=>String)
   @Column()
   NOMBRE_ASESOR:string

   @Field(()=>String)
   @Column()
   PROFILE_ASESOR:string;

   @Field(()=>String)
   @Column()
   DNI_ASESOR:string

   @Field(()=>String)
   @Column()
   CORREO_ASESOR:string

   @Field(()=>String)
   @Column()
   APELLIDO_ASESOR:string

   @Field(()=>Int)
   @Column()
   EDAD_ASESOR:number

   @Field(()=>String)
   @Column()
   GENERO_ASESOR:string

   @Field(()=>String)
   @Column()
   NACIONALIDAD_ASESOR:string

   @Field(()=>String)
   @Column()
   DIRECCION_ASESOR:string

   @Field(()=>String)
   @Column()
   ESPECIALIZACIONES_ASESOR:string

   @Field(()=>Int)
   @Column()
   EGRESADO_ASESOR:number

   @Field(()=>String)
   @Column()
   PASSWORD_ASESOR:string
}
