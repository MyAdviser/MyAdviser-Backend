import { Module  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV != 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      //entities : []
    }),
  ],
  controllers: [],
  providers: []
})
export class AppModule  {
};
