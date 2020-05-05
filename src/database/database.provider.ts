import { Sequelize } from 'sequelize-typescript';
import { User } from './../users';
import { Post } from './../posts';
import { ConfigService } from './../shared';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize: Sequelize = new Sequelize(
        configService.sequelizeOrmConfig,
      );
      sequelize.addModels([User, Post]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
