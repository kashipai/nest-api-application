import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) {}

  async findAll() {
    const users = await this.usersRepository.findAll<User>();
    return users.map(user => new UserDto(user));
  }
}
