import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moments } from 'entities/Moments';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { serveUrl } from 'src/config';
import { Userinfo } from 'entities/Userinfo';

@Injectable()
export default class MomentService {
  @InjectRepository(Moments)
  private momentsRepository: Repository<Moments>;

  async find() {
    try {
      const data = await this.momentsRepository.find({ relations: ['owner'] });
      //   const { owner, ...ret } = data;
      const finalData = data.map((item) => {
        const { owner, ...ret } = item;
        return {
          ...ret,
          userName: owner.userName,
          avatar: serveUrl + owner.avatar,
        };
      });
      return {
        success: true,
        data: finalData,
      };
    } catch (e) {
      return {
        success: false,
        msg: e,
      };
    }
  }

  async create(body, photo: Express.Multer.File, user: Userinfo) {
    // console.log(body, photo);
    const filePath =
      'src/upload/' +
      user.id +
      body.createTime.slice(0, 10) +
      photo.originalname;
    await fs.writeFile(filePath, photo.buffer);
    try {
      const data = await this.momentsRepository.save({
        ...body,
        ownerId: user.id,
        photo: filePath.slice(10),
      });

      return {
        success: true,
        mag: '发布动态成功！',
        data: {
          ...data,
          photo: serveUrl + filePath.slice(11),
        },
      };
    } catch (e) {
      return {
        success: false,
        msg: e,
      };
    }
    // awai
  }
}
