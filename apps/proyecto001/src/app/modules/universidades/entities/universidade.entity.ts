import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
   synchronize:true,
   schema:'MY_ADVISER',
   name:'UNIVERSIDAD'
})
@ObjectType()
export default class Universidad {

   @Field(()=>Int)
   @PrimaryColumn()
   ID_UNI:number

   @Field(()=>String)
   @Column()
   RUC_UNI:string

   @Field(()=>String)
   @Column()
   NOMBRE_UNI:string

   @Field(()=>String)
   @Column()
   LOGO_UNI:string

   @Field(() => String)
   @Column()
   DEPARTAMENTO_UNI:string

   @Field(() => String)
   @Column()
   DIRECCION_UNI:string
}
