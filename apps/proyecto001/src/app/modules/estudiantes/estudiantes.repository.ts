import { AppDataSource } from "app/db";
import Estudiante from "./entities/estudiante.entity";

export const EstudianteRepository = AppDataSource.getRepository(Estudiante).extend({
   async newId() {
      return this.query(
         `
         SELECT 
            (CASE 
               WHEN MAX(ID_ESTUDIANTE) IS NULL
               THEN 1
               ELSE MAX(ID_ESTUDIANTE) + 1
            END) AS id
         FROM ESTUDIANTE
      `
      ).then((data): number => data?.pop()?.id);
   },
})