import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { reactionsTypes } from "App/Utils";

export default class extends BaseSchema {
  protected tableName = "reactions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.enum("type", reactionsTypes);
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
