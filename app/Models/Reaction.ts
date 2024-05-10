import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { ReactionsTypes } from "App/Utils";

export default class Reaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public type: ReactionsTypes;

  @column()
  public userId: number;

  @column()
  public postId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
