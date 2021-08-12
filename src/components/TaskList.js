import React, { Component } from 'react'
import MyModal from './MyModal';
export class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            index: null,
            value: ''
        }
    }

    removeTask(index) {
        if(!window.confirm('Do you really want to delete this task?')) {
            return false;
        }

        this.props.setList((prevList) => {
            const list = [...prevList];
            list.splice(index, 1);
            return list;
        });
    }

    editTask(index) {
        const val = this.props.listData[index].task;
        this.setState({ index: index, value: val, showModal: true });
    }

    completeTask(target, index, task, taskStatus) {
        const element = target.closest('tr').children.item(1);
        let completed;
        if (taskStatus) {
            element.style.textDecoration = "";
            target.innerHTML = 'Completed';
            target.nextSibling.disabled = false;
            completed = false;
        }
        else {
            element.style.textDecoration = "line-through";
            target.innerHTML = 'InComplete';
            target.nextSibling.disabled = true;
            completed = true;
        }
        this.props.setList((prevList) => {
            let list = [...prevList];
            list.splice(index, 1, { task: task, completed: completed });
            return list;
        });
    }

    submitHandler(editedTask) {
        console.log(editedTask);
        this.setState({ showModal: false });
        this.props.setList((prevList) => {
            let list = [...prevList];
            list.splice(this.state.index, 1, { task: editedTask, completed: false });
            return list;
        });
    }

    render() {

        return (
            <>
                <table className="table is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th style={{ maxWidth: '65%' }}>Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.listData ? this.props.listData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td style={{ textDecoration: item.completed && 'line-through' }}>{item.task}</td>
                                        <td>
                                            <div className="buttons">
                                                {
                                                    item.completed ?
                                                        <button className="button is-info" onClick={(event) => this.completeTask(event.currentTarget, index, item.task, item.completed)}>InComplete</button> :
                                                        <button className="button is-info" onClick={(event) => this.completeTask(event.currentTarget, index, item.task, item.completed)}>Completed</button>
                                                }
                                                <button className="button is-warning" onClick={() => this.editTask(index)} disabled={item.completed}>Edit</button>
                                                <button className="button is-danger" onClick={() => this.removeTask(index)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : null
                        }
                    </tbody>
                </table>
                {this.state.showModal &&
                    <MyModal value={this.state.value} clickSubmit={(value) => this.submitHandler(value)} />
                }
            </>
        )
    }
}

export default TaskList
