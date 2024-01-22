
export const isProd = process.env.NODE_ENV === 'production'
export const isDev = process.env.NODE_ENV === 'development'

export const contactAdminError = {
   errors: [
      {
         field: '*',
         message: 'Error desconocido, contacte con su administrador.'
      }
   ]
}
