import { Helmet } from "react-helmet-async";

import { Container, Grid } from "@mui/material";

import CustomBreadcrumbs from "../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import WorkorderDetailsForm from "../../sections/dashboard/workorders/WorkorderDetailsForm";

export default function CreateWorkorderPage() {
  const { translate } = useLocales();
  return (
    <>
      <Helmet>
        <title> Workorder: Create a Work order </title>
      </Helmet>

      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={translate("workorder.form.title")}
          id="workorder-create"
          links={[
            {
              name: translate("breadcrumb.dashboard"),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate("breadcrumb.workorder"),
              href: PATH_DASHBOARD.workorder.root,
            },
            { name: translate("breadcrumb.create_workorder") },
          ]}
        />
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} md={12}>
            <WorkorderDetailsForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
