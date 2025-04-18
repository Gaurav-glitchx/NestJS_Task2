import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<UserDocument>  // Added readonly
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(name: string ,email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ 
      name,
      email, 
      password: hashedPassword 
    });    return user.save();
  }
  
}

