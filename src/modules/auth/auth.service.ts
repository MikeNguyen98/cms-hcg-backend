import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user || !passwordValid) {
      throw new UnauthorizedException();
    }
    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username
      };
    }
    return null;
  }
}
