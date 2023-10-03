import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    try {
      const result = await this.usersService.insertUser({
        username: userName,
        password: hashedPassword
      });
      return {
        msg: 'User successfully registered',
        userId: result.id,
        userName: result.username
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          statusCode: 422,
          message: 'Tài khoản đã tồn tại'
        };
      }
    }
  }
  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in', sessionID: req.sessionID };
  }
  // Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  getHello(@Request() req): string {
    return req.user;
  }
  //Get / logout
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
