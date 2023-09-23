import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'dgram';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('connection')
  create(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    console.log(body);
    client.emit('message', body);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() body: any) {
    console.log('sendMessage', body);
  }
}
