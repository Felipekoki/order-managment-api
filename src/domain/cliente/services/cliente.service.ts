import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InvalidDocumentException } from "src/domain/utils/exceptions/invalidDocumentException";
import { DocumentValidator } from "src/domain/utils/validators/document.validate";
import { ClienteRepository } from "src/infrastructure/sqldb/repositories/cliente.repository";
import { DoCreateClienteDto } from "../dtos/do-create-cliente.dto.request";
import { DoRemoveClienteResponseDto } from "../dtos/do-remove-cliente.dto.response";
import { DoUpdateClienteDto } from "../dtos/do-update-cliente.dto.request";
import { ICliente } from "../interfaces/entities/client.entity.interface";
import { IClienteRepository } from "../interfaces/repositories/cliente.repository.interface";
import { IClienteService } from "../interfaces/services/cliente.service.interface";
import { Cliente } from "../models/cliente.model";


@Injectable()
export class ClienteService implements IClienteService {

  constructor(@InjectRepository(ClienteRepository) private clienteRepository: IClienteRepository) { }


  async save(cliente: DoCreateClienteDto): Promise<ICliente>{
    if(!DocumentValidator.isCPF(cliente.cpf)){
      throw new InvalidDocumentException(`Invalid CPF document number`) 
    }
    let newCliente = new Cliente();
    newCliente.nome = cliente.nome;
    newCliente.cpf = cliente.cpf;
    newCliente.sexo = cliente.sexo;
    newCliente.email = cliente.email;
    return await this.clienteRepository.doSave(newCliente);
  }

  async update(cliente: DoUpdateClienteDto): Promise<ICliente>{
    if(cliente.cpf != null && !DocumentValidator.isCPF(cliente.cpf)){
      throw new InvalidDocumentException(`Invalid CPF document number`) 
    }

    let updateCliente = new Cliente();
    updateCliente.id = cliente.id;
    updateCliente.nome = cliente.nome;
    updateCliente.cpf = cliente.cpf;
    updateCliente.sexo = cliente.sexo;
    updateCliente.email = cliente.email;
    return await this.clienteRepository.doUpdate(updateCliente);
  }

  async remove(id: number): Promise<DoRemoveClienteResponseDto>{
    const cliente = await this.clienteRepository.doRemove(id); 
    return new DoRemoveClienteResponseDto(cliente.nome, "Was successfully removed");
  }

  async findById(id: number): Promise<ICliente>{
    return await this.clienteRepository.doFindById(id)
  }

  async findAll(): Promise<ICliente[]>{
    return await this.clienteRepository.doFindAll()
  }

}
