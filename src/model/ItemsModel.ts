export interface Items {
  id: number;
  name: String;
}

let item: Items[] = [
  { id: 1, name: "Item" },
  { id: 2, name: "Item" },
];

export const getAllItems = (): Items[] => {
  return item;
};

export const addItem = (name: string) => {
  const newItem: Items = { id: item.length + 1, name };
  item.push(newItem);
  return newItem;
};
