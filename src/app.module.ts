import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Userinfo } from 'entities/Userinfo';
import { SocketModule } from './socket/socket.module';
import { Message } from 'entities/Message';
import { join } from 'path';

console.log(process.env.PASS, 'process.env.PASS');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '101.42.172.229',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: process.env.PASS,
      password: '1234',
      database: 'nest-chat',
      logging: true,
      entities: [Userinfo, Message],
      // 如果配置了 synchronize，还会生成建表 sql 语句来创建表。112233 部署成功了
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      // serveStaticOptions: { index: false },
    }),
    UserModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
