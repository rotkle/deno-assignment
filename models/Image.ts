import { Model, Column, Primary, DataType } from "https://deno.land/x/cotton@v0.7.5/mod.ts"
import { TABLE } from "../db/config.ts"

@Model(TABLE.IMAGE)
export default class Image {
    @Primary()
    id!: number;

    @Column({type: DataType.String})
    name?: string;

    @Column({type: DataType.Number})
    created?: number;

    @Column({type: DataType.Number})
    height?: number;

    @Column({type: DataType.Number})
    width?: number;

    @Column({name: 'user_id', type: DataType.Number})
    userId?: number;
  }