import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-command';
import { AlarmRepository } from '../ports/alarm.repository';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(`CreateAlarmCommandHandler: ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(command.name, command.severity);
    await this.alarmRepository.save(alarm);
  }
}
