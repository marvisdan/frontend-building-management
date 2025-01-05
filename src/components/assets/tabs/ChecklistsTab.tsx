import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Key } from "react";
import { useParams } from "react-router";

import useFetchChecklistsByAssetId from "../../../hooks/useFetchChecklistsByAssetId";
import { useLocales } from "../../../locales";

function ChecklistsTab() {
  const { id } = useParams();
  const { translate } = useLocales();
  const { data, isLoading, isError, error } = useFetchChecklistsByAssetId({
    limit: 5,
    id: Number(id),
  });

  if (isError) {
    return <Typography>{error?.message}</Typography>;
  }

  return isLoading ? (
    <Box mt={2}>
      <LinearProgress />
    </Box>
  ) : !data || data.length === 0 ? (
    <Stack spacing={3} sx={{ py: 1, px: 0 }}>
      <Typography variant="subtitle2" m={1}>
        {translate("asset.form.checklist.no_checklist")}
      </Typography>
    </Stack>
  ) : (
    <Box sx={{ my: 2 }}>
      {data.map(({ name, id, items }: any, key: Key) => (
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle2" fontWeight={600}>
                {name}
              </Typography>
            </AccordionSummary>
            {items.length > 0 ? (
              <AccordionDetails sx={{ overflowX: "scroll" }}>
                {items.map((item: any, key: Key) => (
                  <Stack
                    key={`${item.id}-${key}`}
                    direction="row"
                    justifyContent="flex-start"
                  >
                    <Box
                      component="span"
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{
                        flexShrink: 0,
                        //mr: 2,
                        fontSize: 18,
                      }}
                    >
                      {/* <Checkbox size="small" checked={item.checked} /> */}
                      <Typography variant="body2" fontWeight={400}>
                        {item.name}
                      </Typography>
                    </Box>
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

export default ChecklistsTab;
