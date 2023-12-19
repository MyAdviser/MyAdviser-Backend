import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";


@ObjectType()
export class Usuario {
   @Field(() => String)
   @Column()
   NOMBRE_USUARIO : string;

   @Field(() => String,{nullable:true})
   @Column()
   APELLIDO_USUARIO:string

   @Field(() => Int,{nullable:true})
   @Column()
   EDAD_USUARIO:number

   @Field(() => Int,{nullable:true})
   @Column()
   NRO_TELEF_USUARIO:number

   @Field(() => String,{nullable:true})
   @Column()
   DIRECCION:string
}
