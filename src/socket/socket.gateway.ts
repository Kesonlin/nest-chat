import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'dgram';
import { CreateMessageDto } from './dto';

@WebSocketGateway({
  cors: {
    origin: '*',
    // SO_bro
  },
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('connection')
  create(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(body);
    // client.emit('message', body);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody() body: CreateMessageDto,
    @ConnectedSocket() client: any,
  ) {
    console.log('sendMessage', body);
    this.socketService.create(body);
    // 广播的话自己收不到
    client.broadcast.emit('showMessage', `boradcast ${body}`);
    client.emit('showMessage', body);
  }
}
