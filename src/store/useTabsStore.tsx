import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { tabsType } from "../components/tabs";
import { BUILDING_TABS } from "../constants";

// TODO: for the V2
// const ASSET_LEVELS = [
//   {
//     value: "wing_name_A",
//     label: "Wing name A",
//     level: 1,
//     subLevel: [
//       {
//         value: "floor_1",
//         label: "Floor 1",
//         level: 2,
//         subLevel: [
//           {
//             value: "room_1",
//             label: "Room_1",
//             level: 3,
//           },
//         ],
//       },
//       {
//         value: "Floor_2",
//         label: "Floor 2",
//         level: 2,
//       },
//       {
//         value: "floor_3",
//         label: "Floor 3",
//         level: 2,
//       },
//     ],
//   },
//   {
//     value: "wing_name_B",
//     label: "Wing name B",
//     level: 1,
//     subLevel: [
//       {
//         value: "floor_21",
//         label: "Floor 21",
//         level: 2,
//       },
//       {
//         value: "floor_22",
//         label: "Floor 22",
//         level: 2,
//       },
//       {
//         value: "floor_23",
//         label: "Floor 23",
//         level: 2,
//       },
//       {
//         value: "floor_24",
//         label: "Floor 24",
//         level: 2,
//       },
//       {
//         value: "floor_25",
//         label: "Floor 25",
//         level: 2,
//       },
//     ],
//   },
//   {
//     value: "wing_name_C",
//     label: "Wing name C",
//     level: 1,
//     subLevel: [
//       {
//         value: "floor_31",
//         label: "Floor 31",
//         level: 2,
//       },
//       {
//         value: "floor_32",
//         label: "Floor 32",
//         level: 2,
//       },
//       {
//         value: "floor_33",
//         label: "Floor 33",
//         level: 2,
//       },
//       {
//         value: "floor_34",
//         label: "Floor 34",
//         level: 2,
//       },
//     ],
//   },
// ];

const buildingTabs = {
  name: "Maison Radio Canada",
  description: "Description de la Maison Rafddio Canada",
  levels: [
    // TODO: for the V2
    // {
    //   value: BUILDING_TABS.presentation,
    //   label: "tabs.buildings.presentation",
    //   level: 0,
    // },
    // {
    //   value: BUILDING_TABS.analytics,
    //   label: "tabs.buildings.analytics",
    //   level: 0,
    //   subLevel: [
    //     {
    //       value: BUILDING_TABS.maintenance,
    //       label: "tabs.buildings.maintenance",
    //       level: 1,
    //     },
    //     {
    //       value: BUILDING_TABS.performance,
    //       label: "tabs.buildings.performance",
    //       level: 1,
    //     },
    //   ],
    // },
    // {
    //   value: BUILDING_TABS.workorders,
    //   label: "tabs.buildings.workorders",
    //   level: 0,
    // },
    {
      value: BUILDING_TABS.assets,
      label: "tabs.buildings.assets",
      level: 0,
    },
  ],
};
export interface TabsState {
  tabs: { name: string; description: string; levels: tabsType[] };
  currentTab: string;
  fetchAssetLevels(): void;
  setCurrentTab(value: string): void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    devtools((set) => ({
      currentTab: buildingTabs.levels[0].value,
      tabs: buildingTabs,
      fetchAssetLevels: async () => {
        // TODO: replace ASSET_LEVELS by dynamics asset levels when the levels backend will be done
        // const assetLevels: any[] = await ASSET_LEVELS;

        set(
          (state) => {
            const tabs = [...state.tabs.levels];
            const newTabs = state.tabs.levels.filter(
              (tab) => tab.value !== "assets"
            );
            const assetsTab = tabs.find(
              (tab) => tab.value === "assets"
            ) as tabsType;

            const newAssetTab: tabsType = {
              ...assetsTab,
              // subLevel: assetLevels,
            };

            return {
              ...state,
              tabs: { ...state.tabs, levels: [...newTabs, newAssetTab] },
            };
          },
          false,
          "fetchAssetLevels"
        );
      },
      setCurrentTab: (value: string) =>
        set(
          (state) => {
            const newTab = [...state.tabs.levels];
            const tab: tabsType[] = newTab.filter(
              (tab: tabsType) => tab.value === value
            );
            const currentTab = tab[0].value;
            return {
              ...state,
              currentTab,
            };
          },
          false,
          "setCurrentTab"
        ),
    })),
    { name: "buildingTabs", storage: createJSONStorage(() => sessionStorage) }
  )
);
