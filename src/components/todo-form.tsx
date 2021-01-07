import React from 'react'
import { TodoFormInterface, TodoInterface } from '../modal/interface'
import shortid from 'shortid'
import { Button, Icon } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check';
import CreateTodoModal from './create-todo-item';


export default function TodoForm(props: TodoFormInterface) {

    return (
        <div className="todo-form">
            <Button variant="contained" onClick={props.checkAllTodos}>
                <CheckIcon />
            </Button>

            <CreateTodoModal handleTodoCreate={props.handleTodoCreate}/>

            <input
                className="todo-form-input"
                required
                type="text"
                placeholder='Enter new todo'
                onBlur={props.handleTodoBlur}
            />
        </div>
    )
}
