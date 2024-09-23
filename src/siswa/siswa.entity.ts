import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity('siswa')
@Unique(['email'])
export class Siswa extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nama: string;
  @Column()
  email: string;
  @Column()
  tempat_lahir: string;
  @Column()
  tanggal_lahir: Date;
  @Column()
  nisn: string;
  @Column()
  nik: string;
  @Column()
  alamat: string;
  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
