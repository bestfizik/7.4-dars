import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AuthEntity } from './auth.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  bio: string;

  @OneToOne(() => AuthEntity, { cascade: true, eager: true })
  @JoinColumn()
  auth: AuthEntity;
}
