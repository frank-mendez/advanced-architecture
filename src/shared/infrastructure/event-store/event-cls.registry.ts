import { Type } from '@nestjs/common';

export class EventClsRegistry {
  private static readonly eventClsMap = new Map<string, any>();

  static add(eventCl: Type): void {
    this.eventClsMap.set(eventCl.name, eventCl);
  }

  static get(eventClsName: string): Type {
    const eventCls = this.eventClsMap.get(eventClsName);
    if (!eventCls) {
      throw new Error(`Event class not found: ${eventClsName}`);
    }
    return eventCls;
  }
}
