import { Alarm } from '../../domain/alarm';
import { GetAlarmsQuery } from '../queries/get-alarms.query';

export abstract class AlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
  abstract findAll(query: GetAlarmsQuery): Promise<Alarm[]>;
}
