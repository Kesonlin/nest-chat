import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userinfo } from 'entities/Userinfo';
import { promises as fs } from 'fs';
import { md5 } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(Userinfo)
  private userRepository: Repository<Userinfo>;

  @Inject(JwtService)
  private jwtService: JwtService;

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
        password: md5(createUserDto.password),
        createTime: new Date().toJSON(),
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

  async findAll() {
    const data = await this.userRepository.find({});

    return data.map((v) => {
      return {
        ...v,
        avatar: 'http://10.0.2.2:3000/' + v.avatar,
      };
    });
  }

  async check(body: { userName: string; password: string }) {
    try {
      const data = await this.userRepository.find({
        where: {
          userName: body.userName,
        },
      });

      if (!data || !data.length) {
        return {
          success: false,
          msg: '账号不存在',
        };
      }

      if (data[0].password !== md5(body.password)) {
        return {
          success: false,
          mag: '密码错误',
        };
      }

      const token = await this.jwtService.signAsync({
        user: {
          id: data[0].id,
          userName: data[0].userName,
        },
      });

      return {
        success: true,
        msg: '登录成功',
        data: {
          ...data[0],
          avatar: 'http://10.0.2.2:3000/' + data[0].avatar,
          token: 'bearer ' + token,
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

  async update(body, userInfo) {
    const data = await this.userRepository.find({
      where: {
        userName: userInfo.userName,
        id: userInfo.id,
      },
    });

    if (!data || !data.length) {
      return {
        success: false,
        msg: '用户不存在或者token过期',
      };
    }

    try {
      await this.userRepository.update(userInfo.id, { ...body });

      return {
        success: true,
        data: {
          ...data[0],
          recentText: body.recentText,
          avatar: 'http://10.0.2.2:3000/' + data[0].avatar,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
