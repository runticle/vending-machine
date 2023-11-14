import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { Product } from './Product';
import { BaseEntity } from './BaseEntity';

export enum UserRole {
	BUYER = 'buyer',
	SELLER = 'seller',
}

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
	@Column({
		type: 'text',
		nullable: false,
	})
	username: string;

	@Column({
		type: 'text',
		nullable: false,
	})
	password: string;

	@Column({ default: 0, type: 'integer' })
	deposit: number;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.BUYER,
	})
	role: UserRole;

	@OneToMany(() => Product, product => product.seller)
	products: Product[];

	static findById(id: number) {
		return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
	}
}
