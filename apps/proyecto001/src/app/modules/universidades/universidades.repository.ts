import { AppDataSource } from "../../db/index";
import Universidad from "./entities/universidade.entity";

export const UniversidadRepository = AppDataSource.getRepository(Universidad).extend({
   
})