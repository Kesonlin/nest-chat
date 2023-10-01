import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Userinfo } from 'entities/Userinfo';
import { SocketModule } from './socket/socket.module';
import { Message } from 'entities/Message';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nest-chat',
      logging: true,
      entities: [Userinfo, Message],
      // 如果配置了 synchronize，还会生成建表 sql 语句来创建表。112233
      synchronize: true,
    }),
    UserModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
