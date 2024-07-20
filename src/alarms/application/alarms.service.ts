import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-command';
import { Alarm } from '../domain/alarm';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarms.query';
import { AcknowledgeAlarmCommand } from './commands/acknowledge-alarm.command';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createAlarmDto: CreateAlarmCommand): Promise<Alarm> {
    return this.commandBus.execute(createAlarmDto);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery('asc', 'name'));
  }

  acknowledge(id: string) {
    return this.commandBus.execute(new AcknowledgeAlarmCommand(id));
  }
}
