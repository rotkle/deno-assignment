import { Model, Column, Primary, DataType } from "https://deno.land/x/cotton@v0.7.5/mod.ts"
import { TABLE } from "../db/config.ts"
import Attribute from "./Attribute.ts";
import Image from "./Image.ts";

@Model(TABLE.USER)
export default class User {
    @Primary()
    id!: number;

    @Column({type: DataType.String})
    first_name?: string;

    @Column({type: DataType.String})
    last_name?: string;

    @Column({type: DataType.Number})
    birthday?: number;

    @Column({type: DataType.String})
    email?: string;

    media?: Image[];

    attributes?: Attribute[];
}