import React from 'react'

interface FooterInterface {
    handleTodoFilter: (filter: number) => void
}

export default function Footer(props: FooterInterface) {
    return (
        <div className="list-footer">
            <button onClick={() => props.handleTodoFilter(0)}>All</button>
            <button onClick={() => props.handleTodoFilter(1)}>Active</button>
            <button onClick={() => props.handleTodoFilter(2)}>Completed</button>
        </div>
    )
}
