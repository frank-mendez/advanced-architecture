import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';
import { Logger } from '@nestjs/common';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';
import { SerializablePayload } from '../../../shared/domain/interfaces/serializable-event';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializablePayload<AlarmCreatedEvent>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    public readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializablePayload<AlarmCreatedEvent>) {
    this.logger.log(`AlarmCreatedEventHandler: ${JSON.stringify(event)} `);

    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity,
      isAcknowledged: event.alarm.isAcknowledged,
      triggeredAt: new Date(event.alarm.triggeredAt),
      items: event.alarm.items,
    });
  }
}
