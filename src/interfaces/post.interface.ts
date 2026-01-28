export interface IUser {
  id: number; // dummyjson uses number for user id
  firstName: string;
  lastName: string;
  maidenName: string; // Added from dummyjson
  age: number; // Added from dummyjson
  gender: string;
  email: string;
  phone: string;
  username: string; // Added from dummyjson
  password?: string; // Added from dummyjson, optional
  birthDate: string; // Added from dummyjson
  image: string; // 'picture' is 'image' in dummyjson
  bloodGroup: string; // Added from dummyjson
  height: number; // Added from dummyjson
  weight: number; // Added from dummyjson
  eyeColor: string; // Added from dummyjson
  hair: { // Added from dummyjson
    color: string;
    type: string;
  };
  ip: string; // Added from dummyjson
  address: { // Added from dummyjson
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string; // Added from dummyjson
  university: string; // Added from dummyjson
  ein: string; // Added from dummyjson
  ssn: string; // Added from dummyjson
  userAgent: string; // Added from dummyjson
}

// dummyjson does not have a direct ILocation interface for users, it's embedded in address.
// Keeping it for now if other parts of the app expect it, but it might become unused.
export interface ILocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

// dummyjson does not have a direct ITag interface, tags are strings on posts.
// This interface might become unused.
export interface ITag {
  id: string;
  name: string;
}

export interface IPost {
  id: number; // dummyjson uses number for post id
  title: string; // Added from dummyjson
  body: string; // 'text' is 'body' in dummyjson
  userId: number; // 'owner' is 'userId' in dummyjson
  tags: string[];
  reactions: { // 'likes' is 'reactions.likes' in dummyjson
    likes: number;
    dislikes: number;
  };
  views: number; // Added from dummyjson
  // dummyjson posts do not have a direct 'image' field or 'publishDate'.
  // We'll need to adapt or remove these if they are critical.
  // For now, I'll add a placeholder image and use a generic date.
  image?: string; // Placeholder for image, as dummyjson posts don't have it directly
  publishDate?: string; // Placeholder for publishDate
}

export interface IComment {
  id: number; // dummyjson uses number for comment id
  body: string; // 'message' is 'body' in dummyjson
  postId: number; // Added from dummyjson
  user: { // 'owner' is 'user' in dummyjson
    id: number;
    username: string;
  };
  // dummyjson comments do not have a 'publishDate'.
  publishDate?: string; // Placeholder for publishDate
}

// Generic API response structure for dummyjson.com
export interface IApiResponse<T> {
  data: T[]; // This will be mapped from 'posts', 'users', or 'comments' array
  total: number;
  page: number; // Calculated from 'skip'
  limit: number;
}