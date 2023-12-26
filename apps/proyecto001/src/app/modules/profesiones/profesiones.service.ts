import { Injectable } from '@nestjs/common';
import {ProfesionRepository} from './profesiones.repository';

@Injectable()
export class ProfesionesService {
  // constructor( private readonly profesionRepository:typeof ProfesionRepository){}
  constructor( private readonly profesionRepository:typeof ProfesionRepository){}

  findOne(id:number){
    try {
      return this.profesionRepository.find({where:{ID_PROFESION:id}});
    } catch(error){
      return error;
    }
  }

  setHi(){
    return 'hola';
  }
  async getAllProfesion () {
    return await this.profesionRepository.find();
  }
}
