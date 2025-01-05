import { WORKORDER_VIEW } from "../../constants";
import WorkordersCalendarView from "../../pages/workorders/WorkordersCalendarView";
import WorkordersCardView from "../../pages/workorders/WorkordersCardView";
import WorkordersListView from "../../pages/workorders/WorkordersListView";

type WorkordersProps = {
  view: WORKORDER_VIEW;
  data: any;
  isFetching: boolean;
  isError: boolean;
  error: any;
  refetch?: any;
};
const WorkorderContent = ({
  view,
  data,
  isFetching,
  isError,
  error,
  refetch,
}: WorkordersProps) =>
  view === WORKORDER_VIEW.List ? (
    <WorkordersListView
      data={data}
      isFetching={isFetching}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  ) : view === WORKORDER_VIEW.Calendar ? (
    <WorkordersCalendarView workorders={data?.results} />
  ) : (
    <WorkordersCardView workorders={data?.results} />
  );

export default WorkorderContent;
