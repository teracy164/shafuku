import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { User } from './user.entity';
import { AuthUtil } from 'src/utils/auth';

@Seeder({
  model: User,
  containsForeignKeys: false,
})
export class SeedUser implements OnSeederInit {
  run() {
    const data: Partial<User>[] = [
      {
        username: 'test',
        password: 'test',
        name: 'テスト太郎',
        authority: 1,
      },
    ];
    return data;
  }

  everyone(data) {
    if (data.password) {
      const salt = AuthUtil.createSalt();
      data.password = AuthUtil.createHash(data.password, salt);
      data.salt = salt;
    }

    data.created_at = new Date().toISOString();
    data.updated_at = new Date().toISOString();

    return data;
  }
}
