import { Checkbox } from '@material-ui/core'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { TodoItemInterface } from '../modal/interface'
import AlertDelete from './alert-delete'

export default function TodoItem(props: TodoItemInterface) {
    const [isDeadLine, setIsDeadLine] = useState<boolean>(false);

    const convertDateTimeToString = (date: Date): string => {
        let dateString = "";
        dateString += date.getHours() + ":" + date.getMinutes() + " "
        + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
        return dateString
    }

    useEffect(() => {
        onDeadline();
    }, [props.todo])

    const onDeadline = () => {
        let dateline = new Date(props.todo.dateTime);
        var dateNow = new Date();
        let timeLeft = (dateline.getTime() - dateNow.getTime());
        if (timeLeft < 60*15*1000) 
            setIsDeadLine(true);
        else {
            setIsDeadLine(false);
            setTimeout(() => { 
                setIsDeadLine(true); 
            }, timeLeft - 60*15*1000);
        }
    }

    return (
        <div className={'todo-item'} >
            <Checkbox
                checked={props.todo.isCompleted}
                onClick={() => props.handleTodoComplete(props.todo.id)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />

            <div className="todo-item-input-wrapper">
                { isDeadLine ? <span className="deadline">Deadline</span> : ""}
                <input
                    value={props.todo.text}
                    onBlur={props.handleTodoBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)}
                />
                <div >{convertDateTimeToString(props.todo.dateTime)}</div>
            </div>

            <AlertDelete todo={props.todo} handleTodoRemove={props.handleTodoRemove} />
        </div>
    )
}
