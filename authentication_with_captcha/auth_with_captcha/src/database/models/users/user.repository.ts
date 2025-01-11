import { Injectable } from "@nestjs/common";
import { IUserRepository } from "./user.repository.interface";
import { PartialModelObject, Transaction } from "objection";
import { User } from "./user.model";


@Injectable()
export class UserRepository implements IUserRepository {
    readonly transaction = <T>(
        callback: (trx: Transaction) => Promise<T>,
        transaction?: Transaction,
    ): Promise<T> => {
        return transaction ? callback(transaction): User.transaction(callback); 
    }
    async createUser(createUser: PartialModelObject<User>, trx?: Transaction): Promise<User> {
        const {password, email, username} = createUser;
        return User.query(trx).insert({
            password,
            email,
            username
        })
    }
    async updateUser(id: string, update: PartialModelObject<User>, trx?: Transaction): Promise<User | undefined> {
        const updatedUser = await User.query(trx).patchAndFetchById(id, update);
        return updatedUser;
    }
    async deleteUser(id: string, trx?: Transaction): Promise<void> {
        await User.query(trx).deleteById(id);
    }
    async getUserByEmail(email: string, trx?: Transaction): Promise<User | undefined> {
        return User.query(trx).findOne({email})
    }
    async getUserById(id: string, trx?: Transaction): Promise<User | undefined> {
        return User.query(trx).findById(id);
    }
    async getUserByUsername(username: string, trx?: Transaction): Promise<User | undefined> {
        return User.query(trx).findOne({username})
    }
}