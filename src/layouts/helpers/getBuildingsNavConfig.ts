import { PATH_DASHBOARD } from "../../routes/paths";
import { dataBuildingsType } from "../../types";

export const getBuildingsNavConfig = (data: dataBuildingsType[]) =>
  data
    ? data.map(
        ({
          title,
          label,
          id,
        }: {
          title: string;
          label: string;
          id: string;
        }) => ({
          title,
          path: PATH_DASHBOARD.buildings.view(id),
        })
      )
    : [];
