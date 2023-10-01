import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Userinfo } from 'entities/Userinfo';
import { SocketModule } from './socket/socket.module';
import { Message } from 'entities/Message';

console.log(process.env.PASS, 'process.env.PASS');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '101.42.172.229',
      port: 3306,
      username: 'root',
      password: process.env.PASS,
      database: 'chat_nest',
      logging: true,
      entities: [Userinfo, Message],
      // 如果配置了 synchronize，还会生成建表 sql 语句来创建表。112233 部署成功了
      synchronize: true,
    }),
    UserModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
