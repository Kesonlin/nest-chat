import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userinfo } from 'entities/Userinfo';

@Injectable()
export class UserService {
  @InjectRepository(Userinfo)
  private userRepository: Repository<Userinfo>;

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    try {
      const data = await this.userRepository.find({
        where: {
          userName: createUserDto.userName,
        },
      });
      if (data && data.length > 0) {
        return {
          success: false,
          msg: '用户已经存在！',
        };
      }
      await this.userRepository.save(createUserDto);
      return {
        success: true,
        data: createUserDto,
      };
    } catch (e) {
      return {
        success: false,
        msg: e,
      };
    }
  }

  findAll() {
    return this.userRepository.find({});
  }

  async check(body: { userName: string; password: string }) {
    try {
      const data = await this.userRepository.find({
        where: {
          userName: body.userName,
          password: body.password,
        },
      });

      if (!data || !data.length) {
        return {
          success: false,
          msg: '账号不存在或者密码错误',
        };
      }

      return {
        success: true,
        data,
        msg: '登录成功',
      };
    } catch (e) {
      return {
        success: false,
        msg: e,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}