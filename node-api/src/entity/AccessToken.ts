import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class AccessToken extends BaseEntity {
	@Column()
	token: string;

	@Column()
	expires_at: Date;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ nullable: false })
	user_id: number;

	static findByUserId(user_id: number) {
		return this.createQueryBuilder('access_token').where('access_token.user_id = :user_id', { user_id }).getMany();
	}
}
