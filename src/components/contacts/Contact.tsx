import { useState } from "react";
import { useNavigate } from "react-router";

import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  PopoverOrigin,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLocales } from "../../locales";
import { PATH_DASHBOARD } from "../../routes/paths";
import { CopyToClipboardButton } from "../clipboard";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import { CustomAvatar } from "../custom-avatar";
import MenuPopover from "../menu-popover/MenuPopover";

const StyledTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  textAlign: "left",
}));

type RenderMenuProps = {
  open: null | HTMLElement;
  editable?: boolean;
  deleteText: string;
  updateText: string;
  onClose: VoidFunction;
  handleOpenConfirm: VoidFunction;
  onUpdate: VoidFunction;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
};

const RenderMenu = ({
  open,
  editable,
  onClose,
  handleOpenConfirm,
  onUpdate,
  deleteText,
  updateText,
  anchorOrigin,
  transformOrigin,
}: RenderMenuProps) => (
  <MenuPopover
    disabledArrow
    open={open}
    onClose={onClose}
    anchorOrigin={anchorOrigin || { vertical: "bottom", horizontal: "left" }}
    transformOrigin={
      transformOrigin || { vertical: "top", horizontal: "right" }
    }
  >
    {editable && (
      <MenuItem onClick={onUpdate}>
        <ModeEditOutlineIcon fontSize="small" />
        {updateText}
      </MenuItem>
    )}
    <MenuItem onClick={handleOpenConfirm}>
      <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
      {deleteText}
    </MenuItem>
  </MenuPopover>
);

export type ContactProps = {
  id: number;
  thumbnail?: string;
  name: string;
  title: string;
  company: string;
  phone?: string;
  email?: string;
  organization?: {
    id: number;
    owner: number;
    name: string;
    logo: string;
    created: string;
    updated: string;
  };
  onDelete: (id: number) => void;
  editable?: boolean;
};

export default function Contact({
  id,
  thumbnail,
  name,
  title,
  company,
  phone,
  email,
  editable = false,
  onDelete,
}: ContactProps) {
  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { translate } = useLocales();
  const navigate = useNavigate();

  const handleMenuClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent> | undefined
  ) => {
    setOpenPopover(event?.currentTarget as never);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const goToUpdateView = () => {
    navigate(PATH_DASHBOARD.contact.update(id));
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card>
        <CardHeader
          avatar={
            <CustomAvatar
              src={thumbnail || company}
              alt={name || "N/A"}
              name={name || "N/A"}
              hasImage={Boolean(thumbnail)}
              sx={{
                width: "48px",
                height: "48px",
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
              aria-label="company logo"
            />
          }
          action={<MoreVertIcon onClick={handleMenuClick} />}
          titleTypographyProps={{ variant: "subtitle1" }}
          title={name}
          subheader={title}
        />
        <CardContent sx={{ pt: 2 }}>
          <Stack direction={{ sm: "column" }} spacing={0.5}>
            <StyledTypography variant="body2" color="text.secondary">
              <Tooltip title={translate("contacts.label.company")} arrow>
                <BadgeOutlinedIcon
                  sx={{
                    marginRight: 0.7,
                    width: "20px",
                  }}
                />
              </Tooltip>
              {company}
            </StyledTypography>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              id={id.toString()}
            >
              <Tooltip title={translate("contacts.label.phone")} arrow>
                <LocalPhoneOutlinedIcon
                  sx={{
                    marginRight: 0.7,
                    width: "20px",
                  }}
                />
              </Tooltip>
              {!phone || phone.trim() === "" ? (
                translate("N/A")
              ) : (
                <>
                  {phone} <CopyToClipboardButton text={phone} />
                </>
              )}
            </StyledTypography>
            <StyledTypography variant="body2" color="text.secondary">
              <Tooltip title={translate("contacts.label.email")} arrow>
                <MailOutlinedIcon
                  sx={{
                    marginRight: 0.7,
                    width: "20px",
                  }}
                />
              </Tooltip>
              {!email || email.trim() === "" ? (
                translate("N/A")
              ) : (
                <>
                  {email} <CopyToClipboardButton text={email} />
                </>
              )}
            </StyledTypography>
          </Stack>
          <RenderMenu
            editable={editable}
            open={openPopover}
            onClose={handleClosePopover}
            handleOpenConfirm={handleOpenConfirm}
            onUpdate={goToUpdateView}
            deleteText={translate("contacts.actions.delete")}
            updateText={translate("contacts.actions.edit")}
          />
        </CardContent>
      </Card>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={translate("contacts.prompt.title")}
        content={translate("contacts.prompt.message", { value: name })}
        cancelText={translate("contacts.prompt.no")}
        action={
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => {
              setOpenConfirm(false);
              onDelete(id);
            }}
          >
            {translate("contacts.prompt.yes")}
          </Button>
        }
      />
    </Grid>
  );
}
