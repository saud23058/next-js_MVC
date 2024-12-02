import { addItem, getAllItems, Items } from "@/model/ItemsModel";

export const fetchAllData = (): Items[] => {
  return getAllItems();
};

export const createItem = (name: string): Items => {
  if (!name) {
    throw new Error("Name is required");
  }
  return addItem(name);
};
