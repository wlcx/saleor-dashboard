import { TableCell } from "@material-ui/core";
import { DragIcon, makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { SortableHandle as SortableHandleHoc } from "react-sortable-hoc";

const useStyles = makeStyles(
  theme => ({
    columnDrag: {
      "&&&": {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2)
      },
      cursor: "grab",
      width: `calc(48px + ${theme.spacing(1.5)})`
    },
    icon: {
      color: theme.palette.saleor.main[3]
    }
  }),
  { name: "SortableHandle" }
);

const SortableHandle = SortableHandleHoc(() => {
  const classes = useStyles({});

  return (
    <TableCell className={classes.columnDrag}>
      <DragIcon color="inherit" className={classes.icon} />
    </TableCell>
  );
});

export default SortableHandle;
