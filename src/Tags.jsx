import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Tags({ data }) {
  console.log(data);

  const filteredTags = data.reduce((acc, current) => {
    const x = acc.find((item) => item === current);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const count = (data = data.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  ));
  console.log(count);
  console.log(filteredTags);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {Object.entries(count).map(([key, value]) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={key}
            role={undefined}
            dense
            button
            onClick={handleToggle(key)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(key) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={key} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                {value}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
