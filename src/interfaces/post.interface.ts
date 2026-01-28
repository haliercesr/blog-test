export interface IUser {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  email?: string;
  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  location?: ILocation;
  registerDate?: string;
  updatedDate?: string;
}

export interface ILocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface ITag {
  id: string;
  name: string;
}

export interface IPost {
  id: string;
  text: string;
  image: string;
  likes: number;
  link?: string;
  tags: string[];
  publishDate: string;
  owner: IUser;
}

export interface IComment {
  id: string;
  message: string;
  owner: IUser;
  post: string;
  publishDate: string;
}

export interface IApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
