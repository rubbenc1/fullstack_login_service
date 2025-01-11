import { PartialModelObject } from "objection";
import { User } from "./user.model";


export interface IUserRepository {
    createUser(createUser: PartialModelObject<User>): Promise<User>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserById(id: string): Promise<User | undefined>;
    getUserByUsername(username: string): Promise<User | undefined>;
    updateUser(id: string, update: PartialModelObject<User>):Promise<User | undefined>;
    deleteUser(id: string): Promise<void>;
}