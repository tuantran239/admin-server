
export abstract class BaseService<M, C, U, Q, S> {
  abstract create(payload: C, select?: S): Promise<M>;
  abstract update(id: string, payload: U, select?: S): Promise<M>;
  abstract delete(id: string, select?: S): Promise<M>;
  abstract retrieveById(id: string, select?: S): Promise<M>;
  abstract list(query: Q): Promise<M[]>;
}
