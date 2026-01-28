export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  googleId: string;
}

export interface IAuthState {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
