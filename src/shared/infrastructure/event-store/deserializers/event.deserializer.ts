import { Injectable, Type } from '@nestjs/common';
import { Event } from '../schemas/event.schema';
import { SerializebleEvent } from '../../../domain/interfaces/serializeble-event';
import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializebleEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassByType(eventType: string) {
    return EventClsRegistry.get(eventType);
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}
