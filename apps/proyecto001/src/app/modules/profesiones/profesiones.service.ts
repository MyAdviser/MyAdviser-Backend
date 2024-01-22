
import { AppDataSource } from "app/db/index";
import Profesional from "./entities/profesiones.entity";

export const ProfesionalRepository = AppDataSource.getRepository(Profesional).extend({
   async newId() {
      return this.query(
         `
         SELECT 
            (CASE 
               WHEN MAX(ID_PROFESION) IS NULL
               THEN 1
               ELSE MAX(ID_PROFESION) + 1
            END) AS id
         FROM PROFESIONAL
      `
      ).then((data): number => data?.pop()?.id);
   },
})

