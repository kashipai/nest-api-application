import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { JwtPayload } from './auth';
import { sign } from 'jsonwebtoken';
import { ConfigService } from './../shared';
import {
  UserLoginResponseDto,
  CreateUserDto,
  UserDto,
  UpdateUserDto,
  UserLoginRequestDto,
} from './dto';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
  ) {
    this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
  }

  async findAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map(user => new UserDto(user));
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
  }
  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.email = createUserDto.email.trim().toLowerCase();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.gender = createUserDto.gender;
      user.birthday = createUserDto.birthday;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

      const userData = await user.save();

      // when registering then log user in automatically by returning a token
      const token = await this.signToken(userData);
      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      if (err.original.constraint === 'user_email_key') {
        throw new HttpException(
          `User with email ${err.errors[0].value} already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findByPk<User>(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.gender = updateUserDto.gender || user.gender;
    user.birthday = updateUserDto.birthday || user.birthday;

    try {
      const data = await user.save();
      return new UserDto(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    const user = await this.usersRepository.findByPk<User>(id);
    await user.destroy();
    return new UserDto(user);
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
