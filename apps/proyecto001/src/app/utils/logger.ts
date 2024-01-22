import winston from 'winston'

const logger: winston.Logger = winston.createLogger({
   level: 'silly',
   levels: winston.config.npm.levels,
   format: winston.format.combine(
      winston.format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss'
   }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
   ),
   transports: [
   new winston.transports.Console({
      format: winston.format.combine(
         winston.format.cli(),
         winston.format.splat()
      )
   })
   ]
})

export default logger
