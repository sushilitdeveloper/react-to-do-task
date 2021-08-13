import React, { Component } from 'react'
export class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.refTask = React.createRef();
    }

    submitHandler = (event) => {
        event.preventDefault();
        const newTask = this.refTask.current.value.trim();
        if (newTask) {
            this.props.setList((prevList) => {
                return [
                    ...prevList,
                    {
                        task: newTask,
                        completed: false
                    }
                ];
            });
        }
        this.setState({ value: '' });
    }
    render() {
        return (
            <>
                <form onSubmit={this.submitHandler}>
                    <div className="columns">
                        <div className="column is-11">
                            <div className="field is-5">
                                <div className="control">
                                    <input onChange={() => this.setState({ value: this.refTask.current.value })} ref={this.refTask} className="input" name="task" type="text" placeholder="Enter new Task..." value={this.state.value} />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <button className="button is-primary" type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default AddTask
