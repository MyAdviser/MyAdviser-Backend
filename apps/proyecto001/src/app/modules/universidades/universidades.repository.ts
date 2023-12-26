import { AppDataSource } from "app/db";
import Universidad from "./entities/universidade.entity";

export const UniversidadRepository = AppDataSource.getRepository(Universidad).extend({
   
})