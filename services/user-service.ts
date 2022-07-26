import { Q } from "https://deno.land/x/cotton@v0.7.5/mod.ts";
import client  from "../db/client.ts";
import { TABLE } from "../db/config.ts";
import Attribute from "../models/Attribute.ts";
import AttributeUser from "../models/AttributeUser.ts";
import Image from "../models/Image.ts";
import User from "../models/User.ts";

const manager = client.getManager();

function ageFromDateOfBirthday(dateOfBirth: any) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
}

export default {
    getAllUser: async (offset: number, limit: number) => {
        // Query users with offset and limit, included media
        const users = await manager.query(User).limit(limit).offset(offset).all();

        // Query attributes and media belong to users
        for (let i = 0; i < users.length; i++) {
            const attributeUsers = await manager.query(AttributeUser).where("userId",users[i].id).all();

            const attributes = await manager.query(Attribute).where("id", Q.in(attributeUsers.map(a => a.attributeId))).all();

            const media = await manager.query(Image).where("userId", users[i].id).all();

            users[i].attributes = attributes;
            users[i].media = media;
        }

        // return list users
        return users;
    },

    getTotalNumberOfUser: async () => {
        // Get total users from db
        const totalUser = await manager.query(User).count();

        return totalUser;
    },

    addUser: async (bodyObj : any) => {
        // get user values
        const user = new User();
        user.first_name = bodyObj.first_name;
        user.last_name = bodyObj.last_name;
        user.birthday = new Date(bodyObj.birthday).getTime();
        user.email = bodyObj.email;

        // get media values
        const images = bodyObj.media;

        // get attribute values
        const attributes = bodyObj.attributes;

        // validate user input
        if (ageFromDateOfBirthday(user.birthday)<18){
            throw new Error("User must at least 18");
        }

        // insert user to db
        try{
            const totalUser = await manager.query(User).count();
            await manager.save(user);
            const insertedUser = await manager.query(User).where("id",totalUser+1).first();

            // insert media to db
            for (let i = 0; i < images.length; i++){
                const img = new Image();
                img.name = images[i].name;
                img.height = images[i].height;
                img.width = images[i].width;
                img.created = images[i].created;
                img.userId = insertedUser?.id;
                await manager.save(img);
            }

            // insert attribute to db
            for (let i = 0; i < attributes.length; i++){
                const attUser = new AttributeUser();
                attUser.userId = insertedUser?.id;

                // query attribute id
                const att = await manager.query(Attribute).where("name",Q.eq(attributes[i].name)).first();

                attUser.attributeId = att?.id;
                await client.table(TABLE.ATTRIBUTE_USER).insert({user_id:attUser.userId, attribute_id:attUser.attributeId});
            }

            return bodyObj;
        }catch(error){
            throw new Error(error);
        }
    },
};
