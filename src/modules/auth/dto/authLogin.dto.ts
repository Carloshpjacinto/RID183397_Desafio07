import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
