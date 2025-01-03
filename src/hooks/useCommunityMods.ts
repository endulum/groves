import { useEffect, useRef, useState } from "react";

import type { Community, User } from "../types";

export function useCommunityMods(data: Community | null) {
  const preloaded = useRef<boolean>(false);
  const [moderators, setModerators] = useState<User[]>([]);

  useEffect(() => {
    if (data && !preloaded.current) {
      setModerators(data.moderators);
      preloaded.current = true;
    }
  }, [data]);

  const promoteMod = (user: User) => {
    setModerators([...moderators, user]);
  };

  const demoteMod = (user: User) => {
    setModerators(moderators.filter((mod) => mod.id !== user.id));
  };

  return { moderators, promoteMod, demoteMod };
}
