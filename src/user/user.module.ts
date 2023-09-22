import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userinfo } from 'entities/Userinfo';

@Module({
  imports: [TypeOrmModule.forFeature([Userinfo])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
