import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Key } from "react";

import {
  useFetchChecklistsByWorkorderAndAsset,
  useUpdateWorkorderChecklistItemById,
} from "../../hooks";
import { useLocales } from "../../locales";

export default function WorkorderChecklists({
  id,
  assetId,
}: {
  id: number;
  assetId: number;
}) {
  const { translate } = useLocales();
  const { mutate } = useUpdateWorkorderChecklistItemById();
  const { data } = useFetchChecklistsByWorkorderAndAsset({
    workorderId: id,
    assetId,
  });

  const handleChange = (event: any, itemId: number) => {
    const { checked } = event.target;
    mutate({ isChecked: checked, id: itemId });
  };

  return !data?.checklists || data.checklists.length === 0 ? (
    <Stack spacing={3} sx={{ py: 1, px: 0 }}>
      <Typography variant="h6" m={1}>
        {translate("asset.form.checklist.no_checklist")}
      </Typography>
    </Stack>
  ) : (
    <Box sx={{ my: 1 }}>
      {data.checklists.map(({ name, id, items }: any, key: Key) => (
        <Stack
          key={`${id}-${key}`}
          direction="column"
          justifyContent="flex-start"
          flexWrap="wrap"
          sx={{ overflowX: "hidden" }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={items.length > 0 ? <ExpandMoreIcon /> : null}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                {name}
              </Typography>
            </AccordionSummary>
            {items.length > 0 ? (
              <AccordionDetails>
                {items.map((item: any, key: Key) => (
                  <Stack key={`${item.id}-${key}`}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.isChecked}
                          onChange={(event) => handleChange(event, item.id)}
                        />
                      }
                      label={item.name}
                      sx={{
                        cursor: "pointer",
                        textDecoration: item.isChecked
                          ? "line-through"
                          : undefined,
                      }}
                    />
                  </Stack>
                ))}
              </AccordionDetails>
            ) : null}
          </Accordion>
        </Stack>
      ))}
    </Box>
  );
}
