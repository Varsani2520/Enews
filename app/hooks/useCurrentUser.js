import { useState, useEffect } from "react";
import { getUserFromCookies } from "../utils/getUserFromLocal";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserFromCookies();
    setUser(user);
  }, []);

  return user;
};

export default useCurrentUser;
