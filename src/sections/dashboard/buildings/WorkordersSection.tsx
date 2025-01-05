function WorkOrdersSection({
  workorders,
  count,
  isLoading,
  isError,
  error,
}: any) {
  return null;
  // return (
  //   <Box>
  //     {isError ? (
  //       <Box data-testid="workorders-error-message">
  //         <Typography>{error?.message}</Typography>
  //       </Box>
  //     ) : isLoading ? (
  //       <Box data-testid="workorders-loader">
  //         <LinearProgress />
  //       </Box>
  //     ) : (
  //       workorders && (
  //         <WorkordersListView workorders={workorders} count={count} />
  //       )
  //     )}
  //   </Box>
  // );
}

export default WorkOrdersSection;
