import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn } from 'class-validator';
import { Role } from '../../enums/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn([Role.USER, Role.ADMIN])
  role?: Role;
}
