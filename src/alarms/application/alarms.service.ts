import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../presenters/dto/create-alarm.dto';
import { UpdateAlarmDto } from '../presenters/dto/update-alarm.dto';
import { CreateAlarmCommand } from './commands/create-command';

@Injectable()
export class AlarmsService {
  create(createAlarmDto: CreateAlarmCommand) {
    return 'This action adds a new alarm';
  }

  findAll() {
    return `This action returns all alarms`;
  }
}
