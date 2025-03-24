import { set } from "mongoose";

type MapType = number | string | object;
const sessionIdUserMap = new Map<MapType, MapType>();
export const getSessionId = <type>(id: number, user: type) => {
  const sessionId = sessionIdUserMap.get(id);
  return sessionId;
};
export const setSessionId = (id: MapType, user: MapType) => {
  sessionIdUserMap.set(id, user);
};
