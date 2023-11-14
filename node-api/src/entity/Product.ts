import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Product extends BaseEntity {
	@Column({ nullable: false })
	amount_available: number;

	@Column({ nullable: false })
	cost: number;

	@Column({
		type: 'text',
		nullable: false,
	})
	product_name: string;

	@ManyToOne(() => User, user => user.products, { nullable: false, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'seller_id' })
	seller: User;

	@Column({ nullable: false })
	seller_id: number;

	static findById(id: number) {
		return this.createQueryBuilder('product').where('product.id = :id', { id }).getOne();
	}

	static findByUserId(user_id: number) {
		return this.createQueryBuilder('product').where('product.seller_id = :user_id', { user_id }).getMany();
	}

	static findAllAvailable() {
		return this.createQueryBuilder('product').where('product.amount_available > 0').getMany();
	}
}
