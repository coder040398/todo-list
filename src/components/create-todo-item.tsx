import React, { ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, DialogActions, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TodoInterface } from '../modal/interface';
import shortid from 'shortid';

interface CreateTodoInterface {
    handleTodoCreate: (todo: TodoInterface) => void;
}

const useStyles = makeStyles((theme) => ({
    addicon: {
        fontSize: '33px'
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    textField: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      width: 200,
    },
}));

export default function CreateTodoModal(props: CreateTodoInterface) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [textfieldState, setTextfieldState] = React.useState('')
    const [dateTimeState, setDateTimeState] = React.useState<Date>(new Date())
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event: any) => {
        setTextfieldState(event.target.value)
    }

    const handleDateTimeChange = (event: any) => {
        console.log(event.target.value);
        console.log(new Date(event.target.value));
        
        setDateTimeState(new Date(event.target.value))

    }

    const handleSubmit = (event: any) => {
        
        const newTodo: TodoInterface = {
            id: shortid.generate(),
            text: textfieldState,
            isCompleted: false,
            dateTime: dateTimeState
        }
        if(newTodo.text.length === 0){
            alert("Field can not be empty!!!")
        } else{
            props.handleTodoCreate(newTodo)
        }
        // Create new todo item
        

        // Reset the input field
        if (inputRef && inputRef.current) {
            inputRef.current.value = ''
        }
        handleClose()
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                <AddIcon className={classes.addicon} />
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade in={open}>
                    <div className={classes.paper}>
                        <h3 id="transition-modal-title">Create New Todo</h3>

                        <TextField id="standard-basic"
                            label="Todo"
                            onChange={event => handleInputChange(event)} 
                            />
                        <br/>

                        <TextField
                            id="datetime-local"
                            required
                            label="Deadline"
                            type="datetime-local"
                            onChange={handleDateTimeChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <DialogActions>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                Cancel
                        </Button>
                            <Button variant="outlined" color="primary" onClick={(event) => handleSubmit(event)}>
                                Save
                        </Button>
                        </DialogActions>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}