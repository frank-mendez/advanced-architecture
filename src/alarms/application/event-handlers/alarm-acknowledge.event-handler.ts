import { EventsHandler } from '@nestjs/cqrs';
import { AlarmAcknowledgedEvent } from '../../domain/events/alarm-acknowledged.event';
import { Logger } from '@nestjs/common';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';
import { SerializablePayload } from '../../../shared/domain/interfaces/serializable-event';

@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmAcknowledgeEventHandler {
  private readonly logger = new Logger(AlarmAcknowledgeEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializablePayload<AlarmAcknowledgedEvent>) {
    this.logger.log(`AlarmAcknowledgeEventHandler: ${JSON.stringify(event)}`);
    this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}
