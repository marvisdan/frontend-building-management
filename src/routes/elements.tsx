import { ElementType, lazy, Suspense } from "react";

// components
import LoadingScreen from "../components/loading-screen";

// eslint-disable-next-line react/display-name
export const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export const ContactsPage = Loadable(
  lazy(() => import("../pages/contacts/ContactsPage"))
);

export const CreateContactPage = Loadable(
  lazy(() => import("../pages/contacts/CreateContactPage"))
);

export const EditContactPage = Loadable(
  lazy(() => import("../pages/contacts/EditContactPage"))
);

export const PasswordChangedPage = Loadable(
  lazy(() => import("../pages/auth/PasswordChangedPage"))
);

export const BuildingsPage = Loadable(
  lazy(() => import("../pages/BuildingsPage"))
);

export const AnalyticsPage = Loadable(
  lazy(() => import("../pages/AnalyticsPage"))
);

export const LoginPage = Loadable(
  lazy(() => import("../pages/auth/LoginPage"))
);
export const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPasswordPage"))
);

export const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPasswordPage"))
);

export const ProfilePage = Loadable(lazy(() => import("../pages/ProfilePage")));
export const AssetListPage = Loadable(
  lazy(() => import("../pages/assets/AssetListPage"))
);

export const AssetDetailsPage = Loadable(
  lazy(() => import("../pages/assets/AssetDetailsPage"))
);
export const EditAssetPage = Loadable(
  lazy(() => import("../pages/assets/EditAssetPage"))
);
export const WorkorderListPage = Loadable(
  lazy(() => import("../pages/workorders/WorkorderListPage"))
);

export const CreateWorkorderPage = Loadable(
  lazy(() => import("../pages/workorders/CreateWorkorderPage"))
);

export const WorkorderDetailsPage = Loadable(
  lazy(() => import("../pages/workorders/WorkorderDetailsPage"))
);

export const EditWorkorderPage = Loadable(
  lazy(() => import("../pages/workorders/EditWorkorderPage"))
);

export const PageOne = Loadable(lazy(() => import("../pages/PageOne")));
export const PageTwo = Loadable(lazy(() => import("../pages/PageTwo")));
export const PageThree = Loadable(lazy(() => import("../pages/PageThree")));
export const PageFour = Loadable(lazy(() => import("../pages/PageFour")));
export const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
export const PageSix = Loadable(lazy(() => import("../pages/PageSix")));

export const Page404 = Loadable(lazy(() => import("../pages/Page404")));
