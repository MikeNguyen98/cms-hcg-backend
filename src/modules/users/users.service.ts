import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async insertUser(UserData: CreateUserDto) {
    const { username } = UserData;
    const userName = username.toLowerCase();
    const newUser = new this.UserModel({
      username: userName,
      password: UserData.password
    });
    await newUser.save();
    return newUser;
  }

  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.UserModel.findOne({ username });
    return user;
  }
}
