import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurants')
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 50 })
  cnpj: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
