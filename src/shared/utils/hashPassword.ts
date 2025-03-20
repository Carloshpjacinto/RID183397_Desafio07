import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return await bcrypt.hash(password, 10);
}
