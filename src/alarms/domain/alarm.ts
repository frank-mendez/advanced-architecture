import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  constructor(public readonly id: number, public readonly name: string, public readonly severity: AlarmSeverity) {
  }
}