import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginGuard } from 'src/guard/loginGuard';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('avatar', {
      // dest: 'src/upload',
      //   storage: multer.diskStorage({
      //     destination: 'src/upload',
      //     filename: (req, file, cb) => {
      //       console.log(file);
      //       cb(null, 'avatar-' + file.originalname);
      //     },
      //   }),
      //   fileFilter: (req, file, cb) => {
      //     cb(null, true);
      //   },
    }),
  )
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    // console.log(
    //   'createUserDto',
    //   JSON.stringify(createUserDto),
    //   'avatar',
    //   avatar,
    // );

    return this.userService.create(createUserDto, avatar);
  }

  @Get('all')
  // @UseGuards(LoginGuard)
  findAll() {
    return this.userService.findAll();
  }

  /**
   * 验证账号密码是否正确
   * @returns
   */
  @Post('check')
  check(@Body() body: { userName: string; password: string }) {
    return this.userService.check(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
