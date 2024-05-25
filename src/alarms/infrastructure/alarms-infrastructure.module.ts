import { Module } from '@nestjs/common';
import { OrmPersistenceModule } from './persistence/orm/orm-persistence.module';
import { InMemoryPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';

// Decoupled infrastructure from the application layer using the modules composition pattern
// With that simple pattern we can easily switch between different infrastructure implementations
// without changing the application layer
// we simple switch from in memory to orm by changing the module import
@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm' ? OrmPersistenceModule : InMemoryPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
