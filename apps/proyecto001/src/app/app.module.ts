import { Module  } from '@nestjs/common';
import { EstudiantesModule } from './modules/estudiantes/estudiantes.module';
import Database from './db';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfesionesModule } from './modules/profesiones/profesiones.module';
import { UniversidadesModule } from './modules/universidades/universidades.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    EstudiantesModule,
    UniversidadesModule,
    ProfesionesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
    MailerModule.forRoot({
      transport : {
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          clientId: process.env.MAILING_ID,
          clientSecret: process.env.MAILING_SECRET,
          refreshToken: process.env.MAILING_REFRESH,
        }
      }
     })
  ],
  controllers: [],
  providers: [Database]
})
export class AppModule  {
  db:Database

  constructor() {
    this.db = new Database()
  }

  async startServer() {
    await this.db.connect()
  }
};
