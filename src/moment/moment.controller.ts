import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import MomentService from './moment.service';
import { LoginGuard } from 'src/guard/loginGuard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('moment')
export default class MomentController {
  constructor(private readonly momentService: MomentService) {}

  @Get('get')
  @UseGuards(LoginGuard)
  find() {
    return this.momentService.find();
  }

  @Post('create')
  @UseGuards(LoginGuard)
  @UseInterceptors(FileInterceptor('photo', {}))
  create(
    @Body() body: any,
    @UploadedFile() photo: Express.Multer.File,
    @Request() request,
  ) {
    return this.momentService.create(body, photo, request.user);
  }
}
