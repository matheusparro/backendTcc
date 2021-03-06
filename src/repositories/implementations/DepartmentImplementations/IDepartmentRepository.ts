import { DepartmentEntity } from "../../../entities/Department";

export interface IDepartmentRepository  {

  save(department: DepartmentEntity,): Promise<DepartmentEntity>;
  findAll(companyId: number,): Promise<DepartmentEntity[]>;
  findAllHours(companyId: number): Promise<any>;
  update( id: number,name:string): Promise<DepartmentEntity>;

}