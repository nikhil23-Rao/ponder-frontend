import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Formik } from "formik";
import { Field } from "formik";
import { Select, TextField } from "@material-ui/core";
import { SelectCategory } from "../validation/SelectCategory";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SaveDraftModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ top: 5, right: 8, position: "fixed" }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save As Draft
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition as any}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Save As Draft
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save Draft
            </Button>
          </Toolbar>
        </AppBar>
        {/* Write Forms */}
        <Formik
          initialValues={{ image_url: "", category: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit }) => (
            <React.Fragment>
              <div className="mx-auto mt-5">
                <Field name="image_url" as={TextField} />
              </div>
              <div className="mx-auto mt-5">
                <Field name="category" as={SelectCategory} />
              </div>
            </React.Fragment>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
