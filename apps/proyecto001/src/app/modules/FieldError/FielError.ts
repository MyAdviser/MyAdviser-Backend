import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
class FieldError {
   @Field()
   field: string

   @Field()
   message: string
}

export default FieldError
