import { BaseEntity, DeleteResult, Repository } from 'typeorm';

export class BaseService<T extends BaseEntity, R extends Repository<T>> {
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }
  getAll(): Promise<[T[], number]> {
    return this.repository.findAndCount();
  }

  findById(id: string): Promise<T> {
    return this.repository.findOneById(id).then((result) => {
      if (!result) {
        throw new Error(`Record with ID ${id} not found`);
      } else return result;
    });
  }

  findByIds(ids: string[]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: string, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
