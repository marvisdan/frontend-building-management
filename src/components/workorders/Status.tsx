import { SxProps } from "@mui/system";
import Label, { LabelColor } from "../label";

type Props = {
  status: string;
  color?: LabelColor;
  sx?: SxProps;
};

export default function Status({ color, status, sx }: Props) {
  return (
    <Label variant="soft" color={color} sx={{ py: 1 / 4, px: 1, ...sx }}>
      {status}
    </Label>
  );
}
