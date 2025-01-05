// components
import AddTaskIcon from "@mui/icons-material/AddTask";

import Label from "../../../components/label";
import SvgColor from "../../../components/svg-color";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
import { dataBuildingsType, navItemConfig } from "../../../types";
import { getBuildingsNavConfig } from "../../helpers/getBuildingsNavConfig";

const icon = (name: string) => (
  <SvgColor
    src={`/assets/images/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  apartment: icon("ic_apartment"),
  contacts: icon("ic_contacts"),
  workorders: <AddTaskIcon sx={{ width: 1, height: 1 }} />,
};

const buildingItem =
  (translate: (text: any, options?: any) => string) =>
  (buildings: dataBuildingsType[]) => {
    let item: navItemConfig = {
      title: translate("navigation.buildings"),
      path: PATH_DASHBOARD.buildings.view(buildings[0]?.id),
      info: <Label color="info">{buildings.length}</Label>,
      icon: ICONS.apartment,
    };

    if (buildings && buildings.length > 1) {
      item = {
        ...item,
        info: <Label color="info">{buildings.length}</Label>,
        children: getBuildingsNavConfig(buildings),
      };
    }
    return item;
  };

const navConfig =
  (dataBuildings: any) =>
  (translate: (text: string, options?: any) => string) =>
    [
      // GENERAL
      // ----------------------------------------------------------------------
      {
        subheaders: {
          general: "navigation.general",
          todo: "navigation.todo",
        },
        items: [
          // TODO: for the V2
          // {
          //   title: translate("navigation.analytics"),
          //   path: PATH_DASHBOARD.analytics,
          //   icon: ICONS.analytics,
          // },
          buildingItem(translate)(dataBuildings),
          {
            title: translate("navigation.contacts"),
            path: PATH_DASHBOARD.contact.list,
            icon: ICONS.contacts,
          },
          {
            title: translate("navigation.workorders"),
            path: PATH_DASHBOARD.workorder.root,
            icon: ICONS.workorders,
            separator: true,
          },
          // {
          //   title: "Asset List",
          //   path: PATH_DASHBOARD.asset.list,
          //   icon: ICONS.dashboard,
          // },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      // {
      //   subheader: "management",
      //   items: [
      //     {
      //       title: "user",
      //       path: PATH_DASHBOARD.user.root,
      //       icon: ICONS.user,
      //       children: [
      //         {
      //           title: translate("navigation.profile"),
      //           path: PATH_DASHBOARD.user.profile,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ];

export default navConfig;
