import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Fab,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import "dayjs/locale/en";
import "dayjs/locale/fr";
import { Key, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import { useAuthContext } from "../../auth/useAuthContext";
import ConfirmDialog from "../../components/confirm-dialog/ConfirmDialog";
import Image from "../../components/image";
import MultiActionsButton from "../../components/multi-actions-button";
import { multiActionsPopoverType } from "../../components/multi-actions-popover";
import MultiActionsPopover from "../../components/multi-actions-popover/MultiActionsPopover";
import { Notes } from "../../components/notes";
import { useSettingsContext } from "../../components/settings";
import TextMaxLine from "../../components/text-max-line/TextMaxLine";
import {
  SplitButton,
  WorkorderChecklists,
  WorkorderInformations,
} from "../../components/workorders";

import { ASSET_NUMBER_LIST, ASSET_PLACEHOLDER } from "../../constants";
import {
  useCreateWorkorderNote,
  useDeleteWorkorder,
  useEditWorkorder,
  useFetchWorkorderById,
  useFetchWorkorderNotes,
  useFetchWorkorderStatus,
  useResponsive,
} from "../../hooks";
import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import { Asset } from "../../types";
import { getOrderedStatus } from "../helpers";

type AssetListProps = {
  assets: Asset[];
  assetNumber: number;
};

export type AssetItemProps = {
  name: string;
  description: string;
  thumbnail: string;
  onClick: VoidFunction;
};

const WorkorderAssetItem = ({
  thumbnail,
  name,
  description,
  onClick,
}: AssetItemProps) => (
  <Box
    sx={{
      display: "flex",
      marginX: 1,
      borderRadius: 0.5,
      cursor: "pointer",
    }}
    data-testid="asset-item"
    onClick={onClick}
  >
    <Image
      alt={name}
      src={thumbnail}
      height="auto"
      sx={{
        maxWidth: 80,
        maxHeight: 85,
      }}
    />
    <CardContent
      sx={{
        padding: 1,
      }}
    >
      <TextMaxLine title={name} line={1}>
        <Typography variant="subtitle2" component="span">
          {name}
        </Typography>
      </TextMaxLine>
      <TextMaxLine title={name} line={1}>
        <Typography variant="body2" component="span" color="text.secondary">
          {description}
        </Typography>
      </TextMaxLine>
    </CardContent>
  </Box>
);

const WorkorderAssetList = ({ assets, assetNumber }: AssetListProps) => {
  const navigate = useNavigate();
  return (
    <Stack spacing={1}>
      {assets &&
        assets.slice(0, assetNumber).map(
          (
            {
              name,
              description,
              thumbnail,
              id,
            }: {
              name: string;
              description: string;
              thumbnail?: string;
              id: number;
            },
            key: Key
          ) => (
            <WorkorderAssetItem
              key={`${key}-${id}`}
              thumbnail={thumbnail ?? ASSET_PLACEHOLDER}
              name={name}
              description={description}
              onClick={() => navigate(PATH_DASHBOARD.asset.view(id))}
            />
          )
        )}
    </Stack>
  );
};

// TODO: Add Integration tests
export default function WorkorderDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { accessToken } = useAuthContext();
  const { id } = useParams();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { mutate } = useDeleteWorkorder();
  const { mutate: editMutate } = useEditWorkorder();
  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "md");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);
  const [assetNumber, setAssetNumber] = useState<number>(ASSET_NUMBER_LIST);

  const {
    data: notes,
    isLoading: isLoadingNotes,
    isError: isErrorNotes,
    error: errorNote,
  } = useFetchWorkorderNotes(Number(id));

  const handleMiniButton = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const updateStatus = (statusId: number) => {
    editMutate({ workOrderId: Number(id), workOrderStatusId: statusId });
  };
  const { data, isLoading, isError, error } = useFetchWorkorderById({
    id: Number(id),
    token: accessToken,
  });

  const { data: statusList, error: errorStatus } = useFetchWorkorderStatus();

  const multiActions: multiActionsPopoverType[] = [
    {
      icon: <ModeEditOutlineIcon fontSize="small" />,
      label: translate("workorder.actions.edit"),
      onClick: () => {
        navigate(id ? PATH_DASHBOARD.workorder.edit(Number(id)) : "");
      },
    },
    {
      icon: <DeleteOutlineIcon fontSize="small" />,
      label: translate("workorder.actions.delete"),
      onClick: handleOpenConfirm,
    },
  ];

  if (isError) {
    return (
      <Container data-testid="contacts-error-message" maxWidth={"xl"}>
        <Typography>{error?.message}</Typography>
      </Container>
    );
  }

  const handleAllContact = () => {
    setAssetNumber(data.assets.length);
  };

  const handleInitContactList = () => {
    setAssetNumber(ASSET_NUMBER_LIST);
  };

  const handleDelete = (id: number) => {
    mutate(id);
  };

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
            {translate("workorder.not_found")}
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
            <Stack
              display="flex"
              flexDirection={isTablet || isMobile ? "column" : "row"}
              alignItems={isTablet || isMobile ? "flex-start" : "center"}
              justifyContent={isTablet || isMobile ? "center" : "flex-start"}
            >
              {statusList ? (
                <SplitButton
                  status={getOrderedStatus(statusList)}
                  currentStatusId={data.status.id}
                  updateStatus={updateStatus}
                />
              ) : (
                <Typography variant="h6" m={2}>
                  {errorStatus?.message}
                </Typography>
              )}

              {data.name ? (
                <TextMaxLine
                  title={data.name}
                  line={1}
                  width={isMobile ? 300 : isTablet ? 500 : 800}
                  ml={2}
                  variant="button"
                >
                  <Typography variant="h3">{data.name}</Typography>
                </TextMaxLine>
              ) : null}
            </Stack>
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
                      {translate("workorder.actions.delete")}
                    </Button>
                    <Button
                      to={id ? PATH_DASHBOARD.workorder.edit(Number(id)) : ""}
                      component={RouterLink}
                      variant="contained"
                      startIcon={<ModeEditOutlineIcon />}
                    >
                      {translate("workorder.actions.edit")}
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
                <WorkorderInformations workorder={data} />
              </Stack>
              <Card sx={{ mt: 3, p: 2 }}>
                {data?.assets.length === 0 ? (
                  <Typography variant="h5" padding={2}>
                    {translate("asset.not_found")}
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {data.assets ? (
                      <WorkorderAssetList
                        assets={data.assets}
                        assetNumber={assetNumber}
                      />
                    ) : null}
                    {data.assets.length === assetNumber &&
                    data.assets.length >= ASSET_NUMBER_LIST ? (
                      <Button
                        variant="outlined"
                        size="large"
                        color="primary"
                        onClick={handleInitContactList}
                      >
                        {translate("workorder.actions.see_less")}
                      </Button>
                    ) : (
                      <>
                        {data.assets.length > assetNumber ? (
                          <Button
                            variant="outlined"
                            size="large"
                            color="primary"
                            onClick={handleAllContact}
                          >
                            {translate("workorder.actions.see_all_assets")}
                          </Button>
                        ) : null}
                      </>
                    )}
                  </Stack>
                )}
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card>
                <CardHeader
                  px={2}
                  titleTypographyProps={{ variant: "subtitle1" }}
                  title={"Checklist"}
                  subheader={"Complete all tasks in the checklist"}
                />
                <Divider sx={{ mt: 1 }} />
                <CardContent>
                  {data.assets.map(({ id: assetId, name }: any, key: Key) => (
                    <Stack
                      spacing={1}
                      sx={{ py: 1, px: 0 }}
                      key={`${assetId}-${key}`}
                    >
                      <Typography variant="subtitle2">{name}</Typography>
                      <WorkorderChecklists id={Number(id)} assetId={assetId} />
                    </Stack>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Notes
                entityId={id ?? ""}
                type="workorderNote"
                createNote={useCreateWorkorderNote}
                data={notes}
                isLoading={isLoadingNotes}
                isError={isErrorNotes}
                error={errorNote}
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
          </Grid>
        </>
      )}
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("workorder.prompt.title")}
        content={
          <>
            <Alert severity="warning" sx={{ mt: 1, py: 0.25 }}>
              {translate("workorder.prompt.alert")}
            </Alert>
            <Typography variant="body2" mt={1}>
              {translate("workorder.prompt.message", {
                value: data?.name,
              })}
            </Typography>
          </>
        }
        cancelText={translate("workorder.prompt.no")}
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
            {translate("workorder.prompt.yes")}
          </Button>
        }
      />
    </Container>
  );
}
