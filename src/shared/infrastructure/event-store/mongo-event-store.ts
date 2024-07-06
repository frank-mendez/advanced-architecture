import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { SerializebleEvent } from '../../domain/interfaces/serializeble-event';

@Injectable()
export class MongoEventStore {
  private logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
  ) {}

  async persist(
    eventOrEvents: SerializebleEvent | SerializebleEvent[],
  ): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventStore.startSession();
    try {
      session.startTransaction();
      await this.eventStore.insertMany(events, { session, ordered: true });
      await session.commitTransaction();
      this.logger.debug('Events inserted successfully to the event store');
    } catch (error) {
      await session.abortTransaction();
      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
      if (error.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        this.logger.error('Events could not be persisted. Aggregate is stale');
        console.error(error.writeErrors?.[0].err?.errmsg);
      } else {
        throw error;
      }
    } finally {
      await session.endSession();
    }
  }
}
