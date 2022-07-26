import { connect } from "https://deno.land/x/cotton@v0.7.5/mod.ts";
import { DATABASE } from "./config.ts"

const client = await connect({
    type: "sqlite",
    database: DATABASE,
});

export default client;