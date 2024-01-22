import { MiddlewareFn } from 'type-graphql'
import { verifyJWT } from 'app/utils/jwt'
import { ApolloContext } from 'app/interface'

export const isAuth: MiddlewareFn<ApolloContext> = ({ context }, next) => {
  const token = context.req.headers.authorization;
  if (!token || !token.includes('Bearer ')) {
    throw new Error('Token invalido')
  }
  const payload = verifyJWT(token.replace('Bearer ', ''))
  if (!payload || typeof payload === 'string') {
   throw new Error('Token invalido');
  }
  context.req.userId = +payload.id;
  context.req.correoElectronico = payload.correo_electronico;

  return next()
}