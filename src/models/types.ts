export interface IUser {
  // id: number | string | null;
  id: number;
  name: string;
  email: string;

  username?: string;
  phone?: number;
  website?: string;
}

export interface IPost {
  userId?: number | string | null;
  id: number;
  title: string;
  body: string;
  [key: string | number]: any;
}

export interface ITodo {
  userId?: number | string | null;
  id: number;
  title: string;
  completed: boolean;
  // это надо для сортировки
  [key: number | string]: any;
}
