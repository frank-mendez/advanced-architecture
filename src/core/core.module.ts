import { Module } from '@nestjs/common';
import { ApplicationBootstrapOption } from '../common/interface/application-bootstrap-option.interface';
import { TypeOrmModule } from '@nestjs/typeorm';

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
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
