import { Body, Controller, Post } from '@nestjs/common';
import { SocketService } from './socket.service';

@Controller('message')
export class SocketController {
  constructor(private readonly socketService: SocketService) {}

  @Post('all')
  find(@Body() body) {
    return this.socketService.findAll(body);
  }
}
