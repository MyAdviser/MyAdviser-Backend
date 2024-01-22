import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginEstudianteInput {

   @Field(()=>String)
   EMAIL_ESTUDIANTE:string;

   @Field(()=>String)
   PASSWORD:string
}