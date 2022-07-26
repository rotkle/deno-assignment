import { Model, Column, Primary, DataType } from "https://deno.land/x/cotton@v0.7.5/mod.ts"
import { TABLE } from "../db/config.ts"

@Model(TABLE.ATTRIBUTE)
export default class Attribute {
    @Primary()
    id!: number;

    @Column({type: DataType.String})
    name?: string;
  }