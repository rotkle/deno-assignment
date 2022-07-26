import { Model, Column, DataType, Primary } from "https://deno.land/x/cotton@v0.7.5/mod.ts"
import { TABLE } from "../db/config.ts"

@Model(TABLE.ATTRIBUTE_USER)
export default class AttributeUser {
    @Column({name: 'user_id', type: DataType.Number})
    userId?: number;

    @Primary({name: 'attribute_id'})
    attributeId?: number;
  }