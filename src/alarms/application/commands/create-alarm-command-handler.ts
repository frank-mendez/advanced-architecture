import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-command';
import { AlarmRepository } from '../ports/alarm.repository';
import { AlarmFactory } from '../../domain/factories/alarm.factory';
import { Logger } from '@nestjs/common';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateAlarmCommand) {
    this.logger.log(`CreateAlarmCommandHandler: ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(command.name, command.severity);

    // This is not yet the best way to dispatch events
    // Domain events should be dispatched by the aggregate root, inside the domain layer,
    // We'll cover this in the upcoming lessons
    this.eventBus.publish(new AlarmCreatedEvent(alarm));
    return alarm;
  }
}
