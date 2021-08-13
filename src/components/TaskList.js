import React, { Component } from 'react'
import MyModal from './MyModal';
import markButton from '../images/check-mark-3-32.png';
import redoButton from '../images/redo-5-32.png';
import editButton from '../images/edit-32.png';
import deleteButton from '../images/delete-32.png';
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
        if (!window.confirm('Do you really want to delete this task?')) {
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
        let completed;
        if (taskStatus) {
            completed = false;
        }
        else {
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
                            <th style={{width: 50}}>No.</th>
                            <th>Task</th>
                            <th style={{ width: 230 }}>Action</th>
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
                                                        <button className="button is-white" onClick={(event) => this.completeTask(event.currentTarget, index, item.task, item.completed)}><img alt="unmark" src={redoButton}/></button> :
                                                        <button className="button is-white" onClick={(event) => this.completeTask(event.currentTarget, index, item.task, item.completed)}><img alt="mark" src={markButton}/></button>
                                                }
                                                <button className="button is-white" onClick={() => this.editTask(index)} disabled={item.completed}><img alt="edit" src={editButton}/></button>
                                                <button className="button is-white" onClick={() => this.removeTask(index)}><img alt="delete" src={deleteButton}/></button>
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
