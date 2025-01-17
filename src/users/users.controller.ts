import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  CreateUserDto,
  UserDto,
  UpdateUserDto,
  UserLoginResponseDto,
  UserLoginRequestDto,
} from './dto';
import { UsersService } from './users.service';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOkResponse({ type: UserLoginResponseDto })
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: UserLoginResponseDto })
  login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.login(userLoginRequestDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  async getUser(@Req() request): Promise<UserDto> {
    return this.usersService.getUser(request.user.id);
  }

  @Put('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ): Promise<UserDto> {
    return this.usersService.update(request.user.id, updateUserDto);
  }

  @Delete('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  delete(@Req() request): Promise<UserDto> {
    return this.usersService.delete(request.user.id);
  }
}
