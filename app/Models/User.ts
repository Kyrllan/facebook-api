import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  manyToMany,
  ManyToMany,
  computed,
} from "@ioc:Adonis/Lucid/Orm";
import { UserKey, File, Post, Comment } from ".";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public name: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: null })
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>;

  @hasOne(() => File, {
    foreignKey: "ownerId",
    onQuery: (query) => query.where("fileCategory", "avatar"),
  })
  public avatar: HasOne<typeof File>;

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;

  @manyToMany(() => User, {
    pivotTable: "follows",
    pivotForeignKey: "follower_id",
    pivotRelatedForeignKey: "followed_id",
  })
  public follows: ManyToMany<typeof User>;

  @manyToMany(() => User, {
    pivotTable: "follows",
    pivotForeignKey: "followed_id",
    pivotRelatedForeignKey: "follower_id",
  })
  public followers: ManyToMany<typeof User>;

  @computed()
  public get postsCount() {
    return this.$extras.posts_count;
  }

  @computed()
  public get followersCount() {
    return this.$extras.followers_count;
  }

  @computed()
  public get followsCount() {
    return this.$extras.follows_count;
  }

  @computed()
  public get isFollowing() {
    return this.$extras.isFollowing;
  }
}
