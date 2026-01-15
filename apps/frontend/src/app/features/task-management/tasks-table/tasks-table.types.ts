export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface TaskTableRow {
  id: string;
  task: string;
  description: string;
  status: string;
  category: string;
  dueDate: string;
  assigned: string;
}
