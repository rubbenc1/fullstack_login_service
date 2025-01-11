import { Model } from "objection";
import db from "./knex";

Model.knex(db)

export default Model;