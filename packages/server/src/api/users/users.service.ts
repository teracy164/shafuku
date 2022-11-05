import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUtil } from 'src/utils/auth';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { User, UserScope } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  findOneByUsernameForAuth(username: string) {
    return this.userModel.scope(UserScope.AUTH).findOne({ where: { username } });
  }

  add(dto: CreateUserDto) {
    const salt = AuthUtil.createSalt();
    const hash = AuthUtil.createHash(dto.password, salt);
    const data: Partial<User> = {
      ...dto.user,
      salt,
      password: hash,
    };
    return this.userModel.create(data);
  }

  async update(id: number, dto: UpdateUserDto) {
    const target = await this.findOne(id);
    if (target) {
      const { salt, password, username, ...user } = dto.user;
      Object.assign(target, user);
      if (dto.password) {
        const salt = AuthUtil.createSalt();
        const hash = AuthUtil.createHash(dto.password, salt);
        target.salt = salt;
        target.password = hash;
      }
      return target.save();
    }
    throw new BadRequestException();
  }
}
