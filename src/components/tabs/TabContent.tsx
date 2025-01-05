import { Box } from "@mui/material";
import { lazy } from "react";

import { Loadable } from "../../routes/elements";

import { BUILDING_TABS } from "../../constants";

export const WorkordersSection = Loadable(
  lazy(() => import("../../sections/dashboard/buildings/WorkordersSection"))
);

export const AssetsSection = Loadable(
  lazy(() => import("../../sections/dashboard/buildings/assets/AssetsSection"))
);

export const MaintenanceSection = Loadable(
  lazy(
    () =>
      import("../../sections/dashboard/buildings/analytics/MaintenanceSection")
  )
);

export const BuildingPresentationSection = Loadable(
  lazy(
    () =>
      import(
        "../../sections/dashboard/buildings/presentation/BuildingPresentationSection"
      )
  )
);

const PerformanceSection = ({ label }: { label: string }) => (
  <Box sx={{ padding: 3 }}>{label}</Box>
);

export default function TabContent({ tab }: { tab: string }) {
  //const { data, isLoading, isError, error } = useFetchWorkorders({});

  switch (tab) {
    case BUILDING_TABS.presentation:
      return <BuildingPresentationSection />;
    case BUILDING_TABS.workorders:
      // return (
      //   <WorkordersSection
      //     workorders={data && data.results}
      //       count={data && data.count}
      //     isLoading={isLoading}
      //     isError={isError}
      //     error={error}
      //   />
      // );
      return null;
    case BUILDING_TABS.maintenance:
      return <MaintenanceSection />;
    case BUILDING_TABS.performance:
      return <PerformanceSection label={tab} />;
    default:
      return <AssetsSection />;
  }
}
