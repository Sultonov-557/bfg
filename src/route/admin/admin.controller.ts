import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);

export class AdminController {
  static async GetUser(ID: number) {
    console.log(ID);

    const user = await UserRepo.findOneBy({ telegramID: ID.toString() });

    return user;
  }
}
