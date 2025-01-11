import { TABLES } from 'src/database/table_names';
import Model from '../../objection';

export class Captcha extends Model {
    static tableName = TABLES.CAPTCHAS;

    id!: string;
    text!: string;
    expires_at: string
}