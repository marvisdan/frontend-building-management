import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import Tabs from "../../components/tabs/Tabs";
import { EDIT_ASSET_TABS } from "../../constants";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import ContactTab from "../../sections/dashboard/buildings/assets/edit/ContactTab";
import DocumentTab from "../../sections/dashboard/buildings/assets/edit/DocumentTab";
import EditAssetDetailsForm from "../../sections/dashboard/buildings/assets/edit/EditAssetDetailsForm";
import IdentifiersForm from "../../sections/dashboard/buildings/assets/edit/IdentifierForm";
import SpecificationForm from "../../sections/dashboard/buildings/assets/edit/SpecificationForm";

import { TabsType, Translate } from "../../types";

const tabs = (translate: Translate): TabsType[] => [
  {
    value: EDIT_ASSET_TABS[EDIT_ASSET_TABS.Details],
    label: translate("tabs.edit_asset.details"),
    component: <EditAssetDetailsForm />,
  },
  {
    value: EDIT_ASSET_TABS[EDIT_ASSET_TABS.Identifiers],
    label: translate("tabs.edit_asset.identifiers"),
    component: <IdentifiersForm />,
  },
  {
    value: EDIT_ASSET_TABS[EDIT_ASSET_TABS.Specifications],
    label: translate("tabs.edit_asset.specifications"),
    component: <SpecificationForm />,
  },
  {
    value: EDIT_ASSET_TABS[EDIT_ASSET_TABS.Documents],
    label: translate("tabs.edit_asset.documents"),
    component: <DocumentTab hasHeader hasPagination />,
  },
  // {
  //   value: EDIT_ASSET_TABS[EDIT_ASSET_TABS.Checklist],
  //   label: translate("tabs.edit_asset.checklist"),
  //   component: <div>{translate("tabs.edit_asset.checklist")}</div>,
  // },
  {
    value: EDIT_ASSET_TABS[EDIT_ASSET_TABS.Contact],
    label: translate("tabs.edit_asset.contact"),
    component: <ContactTab />,
  },
];

export default function EditAssetPage() {
  const { id } = useParams();
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title> Asset: Edit an Asset </title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={translate("tabs.edit_asset.title")}
          id="general"
          links={[
            {
              name: translate("breadcrumb.dashboard"),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate("breadcrumb.asset"),
            },
            {
              name: id,
              href: PATH_DASHBOARD.asset.view(Number(id)),
            },
            { name: translate("breadcrumb.edit_asset") },
          ]}
        />
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} md={12}>
            <Tabs
              value={EDIT_ASSET_TABS[EDIT_ASSET_TABS.Details]}
              tabs={tabs}
              disabledTab={[EDIT_ASSET_TABS[EDIT_ASSET_TABS.Checklist]]}
              borderRadiusTabs="8px"
              borderRadiusPanel="8px"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
