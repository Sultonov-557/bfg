import { NextFunction } from "grammy";
import { NewContext } from "../common/types/NewContext.type";
import { DataBase } from "../common/managers/database.manager";
import { User } from "../entity/user.entity";
import { clearString } from "../common/utils/utils";
import { BankController } from "../route/bank/bank.controller";
import { FarmController } from "../route/farm/farm.controller";

const userRepo = DataBase.getRepository(User);

export async function AuthGuard(ctx: NewContext, next: NextFunction) {
  if (!ctx.from) return;

  const telegramID = ctx.from.id + "";

  let user = await userRepo.findOne({ where: { telegramID }, relations: ["bank"] });

  if (!user) {
    user = await userRepo.create({ name: ctx.from.username || clearString(ctx.from.first_name), telegramID });
    await userRepo.save(user);
    console.log("created user", user.name);
  }

  if (user.bank) {
    user.bank = (await BankController.UpdateForMoney(user.bank)) || user.bank;
    user.bank = (await BankController.UpdateForRobbery(user.bank)) || user.bank;
  }
  if (user.farm) {
    user.farm = (await FarmController.UpdateFarm(user.farm)) || user.farm;
  }

  ctx.user = user;
  next();
}
