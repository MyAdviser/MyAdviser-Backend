import { AppDataSource } from "app/db";
import Profesion from "./entities/profesiones.entity";

export const ProfesionRepository = AppDataSource.getRepository(Profesion).extend({});