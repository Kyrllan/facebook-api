import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from "@ioc:Adonis/Lucid/Orm";
import { User, Message } from "App/Models";

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userIdOne: number;

  @column()
  public userIdTwo: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>;

  @belongsTo(() => User, { foreignKey: "userIdOne" })
  public userOne: BelongsTo<typeof User>;

  @belongsTo(() => User, { foreignKey: "userIdTwo" })
  public userTwo: BelongsTo<typeof User>;
}
