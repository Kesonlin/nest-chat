import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'entities/Message';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto';

@Injectable()
export class SocketService {
  @InjectRepository(Message)
  private messageRepository: Repository<Message>;

  async create(createMessageDto: CreateMessageDto) {
    try {
      await this.messageRepository.save(createMessageDto);
    } catch (e) {
      return {
        success: false,
      };
    }
  }

  async findAll(relation: { from: string; to: string }) {
    const r1 = await this.messageRepository.find({
      where: {
        sender: relation.from,
        receiver: relation.to,
      },
    });

    const r2 = await this.messageRepository.find({
      where: {
        sender: relation.to,
        receiver: relation.from,
      },
    });

    return {
      success: true,
      msg: '查询成功！',
      data: {
        list: [...r1, ...r2].sort(
          (a: Message, b: Message) => parseInt(a.id) - parseInt(b.id),
        ),
      },
    };
  }
}
