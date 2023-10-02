import { IBaseService } from 'src/interfaces/i.base.service';
import { LoggerService } from 'src/logger/logger.service';
import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  protected readonly logger: LoggerService;

  constructor(repository: R, logger: LoggerService) {
    this.repository = repository;
    this.logger = logger;
  }
  getAll(): Promise<[T[], number]> {
    return this.repository.findAndCount();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOneById(id).then((result) => {
      if (!result) {
        throw new Error(`Record with ID ${id} not found`);
      } else return result;
    });
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  save(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
