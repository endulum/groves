import { type Reply } from "../types";

export const gatherChildrenIds = (children: Reply[]): string[] => {
  const ids: string[] = [];
  children.forEach((child: Reply) => {
    ids.push(child.id);
    if (child.children) {
      ids.push(...gatherChildrenIds(child.children));
    }
  });
  return ids;
};
