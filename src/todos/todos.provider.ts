import { Todo } from './todo.entity';

export const todosProvider = [{ provide: 'TodosRepository', useValue: Todo }];
