import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ChangeStream, ChangeStreamInsertDocument } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';
import { Event, EventDocument } from './schemas/event.schema';
import { EventBus } from '@nestjs/cqrs';
import { EventDeserializer } from './deserializers/event.deserializer';
import { Model } from 'mongoose';

export class EventsBridge
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private changeStream: ChangeStream;

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventBus: EventBus,
    private readonly eventDeserializer: EventDeserializer,
  ) {}
  async onApplicationBootstrap() {
    // @ts-ignore
    this.changeStream = this.eventStore
      .watch()
      .on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
        if (change.operationType === 'insert') {
          this.handleEventStoreChange(change);
        }
      });
  }

  async onApplicationShutdown() {
    return this.changeStream.close();
  }

  handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>) {
    const insertedEvent = change.fullDocument;
    const eventInstance = this.eventDeserializer.deserialize(insertedEvent);
    this.eventBus.subject$.next(eventInstance.data);
  }
}
