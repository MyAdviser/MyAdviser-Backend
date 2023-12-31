import { AppDataSource } from "../../db/index";
import Profesion from "./entities/profesiones.entity";

export const ProfesionRepository = AppDataSource.getRepository(Profesion).extend({});