import { TABLES } from 'src/database/table_names';
import Model from '../../objection';

export class User extends Model {
    static tableName = TABLES.USERS;

    id!: string;
    username!: string;
    password!: string;
    email!: string;
}