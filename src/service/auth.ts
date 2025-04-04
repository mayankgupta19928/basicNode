import { set } from "mongoose";
import { UserDocument } from "../modal/user";

export type MapType = number | string | object | UserDocument | null;
const sessionIdUserMap = new Map<MapType, MapType>();
export const getSessionId = <type>(id: number, user: type) => {
  const sessionId = sessionIdUserMap.get(id);
  return sessionId;
};
export const setSessionId = (id: MapType, user: MapType) => {
  sessionIdUserMap.set(id, user);
};
