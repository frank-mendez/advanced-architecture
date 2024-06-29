import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AlarmEntity } from './alarm.entity';

@Entity('alarm_item')
export class AlarmItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @OneToMany(() => AlarmEntity, (alarm) => alarm.items)
  alarm: AlarmEntity;
}
