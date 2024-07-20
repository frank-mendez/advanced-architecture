import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { NotifyFacilitySupervisorCommand } from './notify-facility-supervisor.command';

@CommandHandler(NotifyFacilitySupervisorCommand)
export class NotifyFacilitySupervisorCommandHandler
  implements ICommandHandler<NotifyFacilitySupervisorCommand>
{
  private readonly logger = new Logger(NotifyFacilitySupervisorCommand.name);
  async execute(command: NotifyFacilitySupervisorCommand) {
    this.logger.log(
      `NotifyFacilitySupervisorCommand: ${JSON.stringify(command)}`,
    );

    // TODO: Implement the logic to notify the facility supervisor or send an email
  }
}
