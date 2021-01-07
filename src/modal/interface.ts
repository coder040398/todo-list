export interface TodoInterface {
    id: string;
    text: string;
    isCompleted: boolean;
    dateTime: Date;
  }
  
  // Todo form interface
  export interface TodoFormInterface {
    checkAllTodos: () => void;
    handleTodoCreate: (todo: TodoInterface) => void;
    handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  // Todo list interface
  export interface TodoListInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove: (id: string) => void;
    handleTodoComplete: (id: string) => void;
    handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
    todos: TodoInterface[];
  }
  
  // Todo item interface
  export interface TodoItemInterface {
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoRemove: (id: string) => void;
    handleTodoComplete: (id: string) => void;
    handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
    todo: TodoInterface;
  }
