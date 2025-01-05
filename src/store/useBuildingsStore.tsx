import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface BuildingsState {
  buidlings: {};
  fetchBuildings(): void;
}

export const useBuildingsStore = create<BuildingsState>()(
  persist(
    devtools((set) => ({
      buidlings: {},
      fetchBuildings: async () => {
        // TODO: replace ASSET_LEVELS by dynamics asset levels when the levels backend will be done
        // const assetLevels: any[] = await ASSET_LEVELS;

        set(
          (state) =>
            // const tabs = [...state.tabs.levels];
            // const newTabs = state.tabs.levels.filter(
            //   (tab) => tab.value !== "assets"
            // );
            // const assetsTab = tabs.find(
            //   (tab) => tab.value === "assets"
            // ) as tabsType;

            // const newAssetTab: tabsType = {
            //   ...assetsTab,
            //   // subLevel: assetLevels,
            // };

            ({
              ...state,
              //   buidlings: { ...state.tabs, levels: [...newTabs, newAssetTab] },
            }),
          false,
          "fetchAssetLevels"
        );
      },
    })),
    { name: "buildingTabs", storage: createJSONStorage(() => sessionStorage) }
  )
);
