import { LinearProgress } from "@mui/material";
import { useState } from "react";

import Profileinfos from "./ProfileInfos";
import UserEditProfileForm from "./UserEditProfileForm";

import { useAuthContext } from "../../auth/useAuthContext";
import { useFetchUserById } from "../../hooks";

const GeneralTabProfile = () => {
  const { accessToken: token, user } = useAuthContext();
  const [show, setShow] = useState<boolean>(false);

  const {
    data: currentUser,
    isLoading,
    error,
    isError,
  } = useFetchUserById({
    id: user?.id,
    token,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  return show ? (
    <UserEditProfileForm
      currentUser={currentUser}
      onClose={() => setShow(false)}
    />
  ) : (
    <Profileinfos
      user={currentUser}
      handleEditProfile={() => {
        setShow(true);
      }}
    />
  );
};

export default GeneralTabProfile;
