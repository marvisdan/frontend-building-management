import { Helmet } from "react-helmet-async";

import { Container, Grid, LinearProgress } from "@mui/material";

import { useParams } from "react-router";
import { useAuthContext } from "../../auth/useAuthContext";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { useFetchWorkorderById } from "../../hooks";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import WorkorderDetailsForm from "../../sections/dashboard/workorders/WorkorderDetailsForm";

export default function EditWorkorderPage() {
  const { translate } = useLocales();
  const { id } = useParams();

  const { accessToken } = useAuthContext();
  const { data, isLoading } = useFetchWorkorderById({
    id: Number(id),
    token: accessToken,
  });

  if (isLoading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title> Workorder: Edit a Work order </title>
      </Helmet>

      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={translate("workorder.form.edit_title")}
          id="workorder-edit"
          links={[
            {
              name: translate("breadcrumb.dashboard"),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate("breadcrumb.workorder"),
              href: PATH_DASHBOARD.workorder.root,
            },
            {
              name: id,
              href: PATH_DASHBOARD.workorder.view(Number(id)),
            },
          ]}
        />

        <Grid container spacing={1} direction="row">
          <Grid item xs={12} md={12}>
            <WorkorderDetailsForm edit={data} isSuccess />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
