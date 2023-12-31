const PORT = process.env.PORT ?? 8080

const config = {
   server: { port: PORT },
   email: {
      DEV: {
      host: process.env.EMAI_CONN_HOST_DEV ?? '',
      port: process.env.EMAI_CONN_PORT_DEV ? +process.env.EMAI_CONN_PORT_DEV : 0,
      secure: (process.env.EMAI_CONN_PORT_DEV ? +process.env.EMAI_CONN_PORT_DEV : 0) === 465,
      auth: {
         pass: process.env.EMAI_CONN_PASS_DEV ?? '',
         user: process.env.EMAI_CONN_USER_DEV ?? ''
      }
   },
      PRD: {
         host: process.env.EMAI_CONN_HOST_PRD ?? '',
         port: process.env.EMAI_CONN_PORT_PRD ? +process.env.EMAI_CONN_PORT_PRD : 0,
         secure: (process.env.EMAI_CONN_PORT_PRD ? +process.env.EMAI_CONN_PORT_PRD : 0) === 465,
         auth: {
            pass: process.env.EMAI_CONN_PASS_PRD,
            user: process.env.EMAI_CONN_USER_PRD
         }
      }
   },
   enviroment: {
      DEV: {
         host: process.env.DB_CONN_HOST_DEV ?? '',
         username: process.env.DB_CONN_USERNAME_DEV ?? '',
         password: process.env.DB_CONN_PASSWORD_DEV ?? '',
         serviceName: process.env.DB_CONN_SERVICE_NAME_DEV ?? '',
         database: process.env.DB_CONN_DATABASE ?? '',
         port: process.env.DB_CONN_PORT_DEV ? parseInt(process.env.DB_CONN_PORT_DEV) : 3000
      },
      PRD: {
         host: process.env.DB_CONN_HOST_PRD ?? '',
         username: process.env.DB_CONN_USERNAME_PRD ?? '',
         password: process.env.DB_CONN_PASSWORD_PRD ?? '',
         serviceName: process.env.DB_CONN_SERVICE_NAME_PRD ?? '',
         port: process.env.DB_CONN_PORT_PRD ? parseInt(process.env.DB_CONN_PORT_PRD) : 3000
      }
   },
   bpm: {
      DEV: {
         url_persona: process.env.URL_BPM_DATOS_PERSONA_DEV,
         url_documento: process.env.URL_BPM_FIRMA_USUARIO_DEV
      },
      PRD: {
         url_persona: process.env.URL_BPM_DATOS_PERSONA_PRD,
         url_documento: process.env.URL_BPM_FIRMA_USUARIO_PRD
      }
   }
}

export const dbConfig = config.enviroment.DEV

export default config
