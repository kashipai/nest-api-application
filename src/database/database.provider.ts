import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Post } from './../posts/post.entity';
import { ConfigService } from './../shared/config/config.service';

console.log( 'creating providers' );
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async ( configService: ConfigService ) =>
        {
            console.log(configService.sequelizeOrmConfig)
            const sequelize: Sequelize = new Sequelize( configService.sequelizeOrmConfig );
            sequelize.addModels( [ User, Post ] )
            await sequelize.sync();
            return sequelize;
        },
        inject: [ ConfigService ]
    },
];
