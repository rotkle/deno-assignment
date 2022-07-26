import User from "../models/User.ts";
import UserService from "../services/user-service.ts"

export default {
    getUsers: async ({request, response}: {request: any, response: any}) => {
      try{
        const offset = request.url.searchParams.get("offset") | 0;
        const limit = request.url.searchParams.get("limit") | 20;

        // get total number of user
        const totalUser = await UserService.getTotalNumberOfUser();

        // get list users paging
        const users = await UserService.getAllUser(offset,limit);

        response.status = 200;
        response.body = {
          success: true,
          data: users,
          pagination: {
            total_user: totalUser,
            total_pages: totalUser/limit,
            offset: offset,
            limit: limit,
          }
        };
      } catch(error){
        response.status = 400;
        response.body = {
          success: false,
          message: `Error: ${error}`,
        };
      }
    },

    createUser: async ({request, response}: {request: any, response: any}) => {
      const body = await request.body();
      if (!request.hasBody) {
        response.status = 400;
        response.body = {
          success: false,
          message: "No data provided",
        };
        return;
      }

      try {
        const bodyObj = await body.value;
        const user = await UserService.addUser(bodyObj);
        response.body = {
          success: true,
          message: "The record was added successfully",
          data: user,
        };
      } catch (error) {
        response.status = 400;
        response.body = {
          success: false,
          message: `Error: ${error}`,
        };
      }
    },
  };