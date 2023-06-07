export interface IAlbum {
  userId?: number | string | null;
  id: number;
  title: string | null;
  [key: string | number]: any;
}

export interface IComment {
  postId: number;
  id: number;
  name: string | null;
  email: string;
  body: string;
  // это надо для сортировки в CommentApiContainer на строке 129 (a[selectedSort])
  [key: string | number]: any;
}

export interface IPhoto {
  albumId?: number | null;
  id: number;
  title: string | null;
  url: string | null;
  thumbnailUrl: string | null;
  // это надо для сортировки в
  [key: string | number]: any;
}

export interface IPost {
  userId?: number | string | null;
  id: number;
  title: string;
  body: string;
  [key: string | number]: any;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  // это надо для сортировки в
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

// export interface IUser {
//   // id: number | string | null;
//   id: number;
//   name: string;
//   email: string;

//   username?: string;
//   phone?: number;
//   website?: string;
// }

export interface IUser {
  // id: number | string | null;
  id: number;
  name: string;
  username: string;
  email: string;
  // phone: string;
  phone: number;
  website: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string | null;
      lng: string | null;
    };
  };

  company: {
    name: string;
    catchPhrase?: string | null;
    bs?: string | null;
  };
  // это надо для сортировки
  [key: number | string]: any;
}

export interface IRoute {
  loadData?: any;
  exact?: boolean | undefined;
  path: string;
  // Component?: React.FC<{}>;
  Component?: any;
  Render?: React.FC<{}>;
}

export interface IButton {
  id: number;
  handle: () => void;
  title: string;
  active: boolean;
  variant?: string | undefined;
}

export interface IButtonsRoute {
  id?: number;
  path: string;
  title: string;
}

export interface IFilter {
  sort: string;
  query: string;
}

export interface IOption {
  value: any;
  name: string | number;
}
