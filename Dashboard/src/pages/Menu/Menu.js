import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { projectDatabase } from "../../firebase/firebase";
import MainTemplate from "../../components/templates/main.template";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup } from "react-bootstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateIcon from '@material-ui/icons/Create';
import AddMenu from "./AddMenu";
import DeleteIcon from '@material-ui/icons/Delete';
import EditMenu from "./EditMenu";
import MenuDataService from "../../services/menu.service";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

{
  /* npm i react-router bootstrap reactstrap uuid*/
}
export const Menu = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenEdit = (id) => {
    setOpenEdit(true);
    setCurrentId(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //Get Data from Firebase
  // Initial State
  const initialState = {
    inventoryList: [],
  };

  var [inventoryObjects, setInventoryObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    projectDatabase.ref("menuItems").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setInventoryObjects({
          ...snapshot.val(),
        });
    });
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      MenuDataService.remove(id);
    }
  };

  return (
    <MainTemplate>
      {/* Heading */}
      <h2 className="pb-3 mt-2" style={{ textAlign:"center", fontSize: 50 }}>
        Menu
      </h2>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add New Menu Item</h2>
            <div className={classes.form} noValidate autoComplete="off">
              <AddMenu />
            </div>
          </div>
        </Fade>
      </Modal>
      {/* Staff List */}
      <ListGroup className="mt-4">
        <div className="col-md">
          {Object.keys(inventoryObjects).map((id) => {
            return (
              <Card className="inventorycard" key={id}>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="holder.js/100px180"
                    src={inventoryObjects[id].image}
                  />
                  <Card.Title>{inventoryObjects[id].menuItemName}</Card.Title>
                  <Card.Text>
                    Description : {inventoryObjects[id].description}
                  </Card.Text>
                  <Card.Text>Price : {inventoryObjects[id].price}</Card.Text>
                  <div>
                    {/* <EditInventory {...({addOrEdit,currentId, contactObjects})} /> */}
                  </div>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                  <div style={{ textAlign: "right" }}>
                    <a
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        onDelete(id);
                      }}
                    >
                      <IconButton edge="end" aria-label="edit">
                        <DeleteIcon />
                      </IconButton>
                    </a>
                    <a
                      onClick={() => {
                        handleOpenEdit(id);
                      }}
                    >
                      <IconButton edge="end" aria-label="edit">
                        <CreateIcon />
                      </IconButton>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </ListGroup>

      {/* Add New Menu Item Button */}
      <div>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>

        {/* Add new menu item modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Add New Menu Item</h2>
              <div className={classes.form} noValidate autoComplete="off">
                <AddMenu />
              </div>
            </div>
          </Fade>
        </Modal>

        {/* Edit menu item modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openEdit}
          onClose={handleCloseEdit}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={openEdit}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Edit Menu Item</h2>
              <div className={classes.form} noValidate autoComplete="off">
                <EditMenu
                  edittedMenuItem={inventoryObjects[currentId]}
                  edittedMenuItemId={currentId}
                />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </MainTemplate>
  );
};
export default Menu;
