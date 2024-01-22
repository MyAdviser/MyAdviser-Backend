import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
   synchronize:true,
   schema:'MY_ADVISER',
   name:'PROFESION'
})
@ObjectType()
export default class Profesion {

   @Field(()=>Int)
   @PrimaryColumn()
   ID_PROFESION:number

   @Field(()=>String)
   @Column()
   NOMBRE_PROFESION:string
}
