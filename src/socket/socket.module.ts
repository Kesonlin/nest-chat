import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'entities/Message';
import { SocketController } from './socket.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [SocketController],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
