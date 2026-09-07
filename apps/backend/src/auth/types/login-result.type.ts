import type { UserWithoutPassword } from '../../users/types/user.type';

export type LoginResult = {
  user: UserWithoutPassword;
  sessionId: string;
};
