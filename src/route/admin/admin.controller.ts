import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);

export class AdminController {
  static async GetUser(ID: number) {
    const user = await UserRepo.findOneBy({ telegramID: ID.toString() });

    return user;
  }

  static async BanUser(ID: number) {
    const user = await UserRepo.findOneBy({ telegramID: ID.toString() });
    if (user) {
      user.banned = true;
      await UserRepo.save(user);
      return user;
    }
    return null;
  }
}
