import { Module } from '@nestjs/common';
import { ApplicationBootstrapOption } from '../common/interface/application-bootstrap-option.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseCoreModule } from '@nestjs/mongoose/dist/mongoose-core.module';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOption) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              database: 'nestjs',
              password: 'postgres',
              username: 'postgres',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseCoreModule.forRoot('mongodb://localhost:27017/vf-read-db'),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
