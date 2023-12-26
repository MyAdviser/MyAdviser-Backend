import { Module  } from '@nestjs/common';
import { EstudiantesModule } from './modules/estudiantes/estudiantes.module';
import Database from './db';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import Universidad from './modules/universidades/entities/universidade.entity';
import { ProfesionesModule } from './modules/profesiones/profesiones.module';

@Module({
  imports: [
    EstudiantesModule,
    Universidad,
    ProfesionesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
      autoSchemaFile: true
    }),
  ],
  controllers: [],
  providers: [Database,AppModule]
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
