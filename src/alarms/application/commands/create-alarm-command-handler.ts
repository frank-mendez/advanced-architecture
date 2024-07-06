import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-command';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(`CreateAlarmCommandHandler: ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );
    this.eventPublisher.mergeObjectContext(alarm).commit();
    return alarm;
  }
}
