import { Controller } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('message')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}
}
