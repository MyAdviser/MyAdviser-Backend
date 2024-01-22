import { Request, Response } from 'express'
// import { GraphQLScalarType, Kind } from 'graphql'
import { registerEnumType } from 'type-graphql'

export type CustomRequest = Request & { userId?: number ; correoElectronico?: string}

export interface ApolloContext {
  req: CustomRequest
  res: Response
}

export enum Estados {
  INACTIVO,
  ACTIVO
}

registerEnumType(Estados, {
  name: 'Estados',
  description: 'Los estados disponibles.'
})

// export const DateScalar = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value) {
//     return value // Convert outgoing Date to integer for JSON
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
//     }
//     return null // Invalid hard-coded value (not an integer)
//   }
// })
