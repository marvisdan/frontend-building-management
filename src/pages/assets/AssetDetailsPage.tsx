import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  Container,
  Fab,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { AxiosError } from "axios";
import { useAuthContext } from "../../auth/useAuthContext";
import AssetContactList from "../../components/assets/AssetContactList";
import AssetInformations from "../../components/assets/AssetInformations";
import DocumentsTab from "../../components/assets/tabs/DocumentsTab";
import WorkordersTab from "../../components/assets/tabs/WorkordersTab";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import MultiActionsButton from "../../components/multi-actions-button/MultiActionsButton";
import { multiActionsPopoverType } from "../../components/multi-actions-popover";
import MultiActionsPopover from "../../components/multi-actions-popover/MultiActionsPopover";
import { Notes } from "../../components/notes";
import { useSettingsContext } from "../../components/settings";
import Tabs from "../../components/tabs/Tabs";
import { ASSET_PLACEHOLDER, ASSET_TABS } from "../../constants";
import {
  useDeleteAsset,
  useFetchAssetById,
  useFetchAssetNotes,
  useFetchDocumentsByAssetId,
  useResponsive,
} from "../../hooks";
import useCreateAssetNotes from "../../hooks/useCreateAssetNote";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import { AssetDocumentType, TabsType, Translate } from "../../types";

const tabs =
  ({
    documents,
  }: {
    documents: AssetDocumentType[] | undefined;
    isLoadingDocument: boolean;
    isErrorDocument: boolean;
    errorDocument: AxiosError<unknown, any> | null;
  }) =>
  (translate: Translate): TabsType[] =>
    [
      {
        value: ASSET_TABS[ASSET_TABS.Workorders],
        label: translate("tabs.assets.work_orders"),
        component: (
          <WorkordersTab buttonText={translate("View all workorders")} />
        ),
      },
      {
        value: ASSET_TABS[ASSET_TABS.Documents],
        label: translate("tabs.assets.documents", {
          value: documents?.reduce(
            (acc: AssetDocumentType[], curr: AssetDocumentType) =>
              !curr.document || !curr.document_filename ? acc : [...acc, curr],
            []
          ).length,
        }),
        component: <DocumentsTab />,
      },
      // {
      //   value: ASSET_TABS[ASSET_TABS.Checklists],
      //   label: translate("tabs.assets.checklists"),
      //   component: <ChecklistsTab />,
      // },
    ];

export default function AssetDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { accessToken } = useAuthContext();
  const { id } = useParams();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);
  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "md");
  const successText = translate("asset.prompt.yes");

  const {
    data: documents,
    isLoading: isLoadingDocument,
    isError: isErrorDocument,
    error: errorDocument,
  } = useFetchDocumentsByAssetId(Number(id));
  const { mutate } = useDeleteAsset(successText);

  const {
    data: notes,
    isLoading: isLoadingNotes,
    isError: isErrorNotes,
    error: errorNotes,
  } = useFetchAssetNotes(Number(id));

  const handleMiniButton = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const handleDelete = (id: number) => {
    mutate(id);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const { data, isLoading, isError, error } = useFetchAssetById({
    token: accessToken,
    id,
  });

  const multiActions: multiActionsPopoverType[] = [
    {
      icon: <ModeEditOutlineIcon fontSize="small" />,
      label: translate("asset.actions.edit"),
      onClick: () => {
        navigate(id ? PATH_DASHBOARD.asset.edit(id) : "");
      },
    },
    {
      icon: <DeleteOutlineIcon fontSize="small" />,
      label: translate("asset.actions.delete"),
      onClick: handleOpenConfirm,
    },
  ];

  if (isError) {
    return (
      <Container data-testid="asset-detail-error-message" maxWidth={"xl"}>
        <Typography>{error?.message}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      {isLoading ? (
        <Box data-testid="asset-detail-loader" mt={2}>
          <LinearProgress />
        </Box>
      ) : !data ? (
        <Grid
          item
          xs={12}
          md={9}
          spacing={2}
          container
          data-testid="no-asset-detail"
        >
          <Typography variant="h6" m={2}>
            {translate("asset.not_found")}
          </Typography>
        </Grid>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h3">{data.name}</Typography>
            {isMobile ? (
              <Fab color="primary" aria-label="more" onClick={handleMiniButton}>
                <MoreVertIcon />
              </Fab>
            ) : (
              <Box>
                {isTablet ? (
                  <MultiActionsButton
                    onClick={handleMiniButton}
                    label={translate("contacts.actions.multi")}
                  />
                ) : (
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<DeleteOutlineIcon />}
                      color="error"
                      onClick={handleOpenConfirm}
                    >
                      {translate("asset.actions.delete")}
                    </Button>
                    <Button
                      to={id ? PATH_DASHBOARD.asset.edit(id) : ""}
                      component={RouterLink}
                      variant="contained"
                      startIcon={<ModeEditOutlineIcon />}
                    >
                      {translate("asset.actions.edit")}
                    </Button>
                  </Stack>
                )}
              </Box>
            )}
          </Box>
          <Grid
            item
            xs={12}
            md={12}
            spacing={2}
            container
            data-testid="asset-detail"
          >
            <Grid item xs={12} md={3}>
              <Stack key={id} spacing={3}>
                <Card>
                  <AssetInformations
                    assetId={id ?? ""}
                    description={data.description}
                    thumbnail={
                      !data.thumbnail || data.thumbnail.trim() === ""
                        ? ASSET_PLACEHOLDER
                        : data.thumbnail
                    }
                    building={data.organizationsite?.name}
                  />
                </Card>

                <AssetContactList
                  title={translate("contacts.title")}
                  assetId={Number(id)}
                  buttonText={translate(
                    "buildings.sections.presentation.all_contacts"
                  )}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Tabs
                value={ASSET_TABS[ASSET_TABS.Workorders]}
                tabs={tabs({
                  documents,
                  isLoadingDocument,
                  isErrorDocument,
                  errorDocument,
                })}
                disabledTab={[ASSET_TABS[ASSET_TABS.SubAssets]]}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Notes
                entityId={id ?? ""}
                type="assetNote"
                data={notes}
                error={errorNotes}
                isLoading={isLoadingNotes}
                isError={isErrorNotes}
                createNote={useCreateAssetNotes}
                title={translate("note.title")}
                nameLabel={translate("note.label.title")}
                contentLabel={translate("note.label.content")}
              />
            </Grid>

            <MultiActionsPopover
              actions={multiActions}
              open={openPopover}
              onClose={handleClose}
            />
            <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              title={translate("asset.prompt.title")}
              content={translate("asset.prompt.message", {
                value: data.name,
              })}
              cancelText={translate("asset.prompt.no")}
              action={
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={async () => {
                    await handleDelete(data.id);
                    setOpenConfirm(false);
                    navigate(-1);
                  }}
                >
                  {translate("asset.prompt.yes")}
                </Button>
              }
            />
          </Grid>
        </>
      )}
    </Container>
  );
}
