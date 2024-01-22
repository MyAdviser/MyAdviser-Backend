import { DataSource } from 'typeorm'

import { dbConfig } from '../config/configEnv'
import logger from '../utils/logger'
import { isDev } from '../utils/constants';
import { entities } from '../Entities';

export const AppDataSource = new DataSource({
   logging: isDev,
   type: 'mysql',
   synchronize: false,
   host: dbConfig.host,
   port: dbConfig.port,
   username: dbConfig.username,
   password: dbConfig.password,
   database:dbConfig.database,
   entities:entities,
})

export default class Database {
   events() {
      process
      .on('SIGTERM', () => {
         AppDataSource.destroy()
         console.log('\nDisconnected from db')
         process.exit(1)
      })
      .on('SIGINT', () => {
         AppDataSource.destroy()
         console.log('\nDisconnected from db')
         process.exit(1)
      })
}

   async connect() {
      this.events()
      try {
         await AppDataSource.initialize()
         logger.info('Connected to the DBs.')
      } catch (error) {
         logger.error('Fail connection to the DB.')   
         console.log({ error })
      }
   }
}
