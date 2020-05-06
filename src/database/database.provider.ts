import { Sequelize } from 'sequelize-typescript';
import { User } from './../users';
import { Post } from './../posts';
import { ConfigService } from './../shared';
import { Todo } from './../todos';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize: Sequelize = new Sequelize(
        configService.sequelizeOrmConfig,
      );
      sequelize.addModels([User, Post, Todo]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
