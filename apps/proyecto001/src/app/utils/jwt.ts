import * as JWT from 'jsonwebtoken'

const KEY = process.env.TOKEN_SECRET!;

export const genJWT = (id: number): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    JWT.sign({ id }, KEY, { expiresIn: '24h' }, function (err, token) {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

export const verifyJWT = (token: string) => {
  try {
    return JWT.verify(token, KEY)
  } catch (error) {
    return null
  }
}

export const decodeJWT = (token: string) => JWT.decode(token)
