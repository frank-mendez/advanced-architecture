import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-command';
import { AlarmRepository } from './ports/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { Alarm } from '../domain/alarm';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}
  create(createAlarmDto: CreateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmFactory.create(
      createAlarmDto.name,
      createAlarmDto.severity,
    );
    return this.alarmRepository.save(alarm);
  }

  findAll() {
    return this.alarmRepository.findAll();
  }
}
