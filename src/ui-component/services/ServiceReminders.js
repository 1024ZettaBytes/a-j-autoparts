import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EventIcon from "@mui/icons-material/Event";
import { useTheme } from "@mui/material";
import {
  FORMAT_OPTIONS,
  compareDates,
  formatDate,
} from "client/utils/dateUtils";

export default function ServiceReminders({ list }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const hasRecords = list && list.length > 0;
  const getReminderItem = (id, date) => {
    const comparedDates = compareDates(date, new Date());
    const isActive = comparedDates === 0 || comparedDates === 1;

    return (
      <ListItem key={`reminder-${id}`}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: isActive
                ? theme.palette.success.light
                : theme.palette.grey[400],
            }}
          >
            <EventIcon color={isActive ? "success" : "disabled"} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={isActive ? "Activo" : "Vencido"}
          secondary={formatDate(new Date(date), FORMAT_OPTIONS.DDofMofYEAR)}
        />
      </ListItem>
    );
  };
  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        !hasRecords ? (
          <ListSubheader component="div" id="nested-list-subheader">
            No hay recordatorios
          </ListSubheader>
        ) : null
      }
    >
      {hasRecords ? (
        <>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Mostrar recordatorios" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {list.map((rem) => getReminderItem(rem.id, rem.date))}
            </List>
          </Collapse>
        </>
      ) : null}
    </List>
  );
}
