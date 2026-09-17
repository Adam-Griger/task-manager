export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
