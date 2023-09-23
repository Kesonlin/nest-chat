import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'dgram';
import { CreateMessageDto } from './dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer() server: any;

  @SubscribeMessage('connection')
  create(@MessageBody() body: any, @ConnectedSocket() client: any) {
    client.emit('join', () => {
      client.join('lin');
    });
    // return { event: 'join', data: '服务端推送到客户端' };
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody() body: CreateMessageDto,
    @ConnectedSocket() client: any,
  ) {
    console.log('sendMessage', body);
    this.socketService.create(body);
    // 广播的话自己收不到
    // client.broadcast.emit('showMessage', `boradcast ${body}`);
    this.server.to('lin').emit('showMessage', body.message);
    client.emit('showMessage', body);
  }
}
