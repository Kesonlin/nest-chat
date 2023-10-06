import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userinfo } from 'entities/Userinfo';
import { promises as fs } from 'fs';

@Injectable()
export class UserService {
  @InjectRepository(Userinfo)
  private userRepository: Repository<Userinfo>;

  async create(createUserDto: CreateUserDto, avatar: Express.Multer.File) {
    // console.log('createUserDto', createUserDto);
    // console.log('avatar', avatar);
    // const upload = multer({ dest: 'uploads/' })
    // multer.diskStorage({
    //   destination: 'src/upload',
    //   filename: (req, file, cb) => {
    //     cb(null, 'avatar-' + avatar.originalname);
    //   },
    // });
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

      if (avatar) {
        const filePath =
          'src/upload/' + createUserDto.userName + avatar.originalname;
        await fs.writeFile(filePath, avatar.buffer);
      }

      await this.userRepository.save({
        ...createUserDto,
        avatar: avatar
          ? '/' + createUserDto.userName + avatar.originalname
          : 'default.jpg',
      });

      return {
        success: true,
        data: {
          ...createUserDto,
          avatar:
            'http:127.0.0.1:3000/' +
            (avatar
              ? '/' + createUserDto.userName + avatar?.originalname
              : 'default.jpg'),
        },
      };
    } catch (e) {
      console.log(e);

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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
