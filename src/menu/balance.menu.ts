import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";

export const balanceMenu = new Menu<NewContext>("balance");

balanceMenu.text("hello");
