import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'newuser@ims.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message:
        'Password must contain uppercase, lowercase, number and special character',
    },
  )
  password: string;

  @ApiProperty({ example: 'New User' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ enum: Role, example: Role.STAFF })
  @IsEnum(Role)
  role: Role;
}
