import { useState, useEffect } from "react";
import { getUserFromLocalStorage } from "../utils/getUserFromLocal";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    setUser(user);
  }, []);

  return user;
};

export default useCurrentUser;
