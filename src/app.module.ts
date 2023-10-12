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
import { JwtModule } from '@nestjs/jwt';

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
      logging: false,
      entities: [Userinfo, Message],
      // 如果配置了 synchronize，还会生成建表 sql 语句来创建表。112233 部署成功了
      synchronize: false,
    }),
    // 静态资源加载
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      // serveStaticOptions: { index: false },
    }),
    JwtModule.register({
      global: true,
      secret: 'lhr',
      // 过期时间
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UserModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
