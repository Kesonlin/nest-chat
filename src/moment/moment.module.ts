import { Module } from '@nestjs/common';
import MomentController from './moment.controller';
import MomentService from './moment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moments } from 'entities/Moments';

@Module({
  imports: [TypeOrmModule.forFeature([Moments])],
  controllers: [MomentController],
  providers: [MomentService],
})
export class MomentModule {}
