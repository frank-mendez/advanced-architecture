import { GetAlarmsQuery } from './get-alarms.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAlarmRepository } from '../ports/find-alarm.repository';
import { AlarmReadModel } from '../../domain/read-models/alarm.read-models';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmRepository) {}

  async execute(): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
