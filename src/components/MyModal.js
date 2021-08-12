import React, { Component } from 'react'
import reactDom from 'react-dom';

export default class MyModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value
        }
    }
    handleInput = (event) => {
        this.setState({ value: event.target.value });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.clickSubmit(this.state.value)
    }

    render() {
        const myModal = (
            <div className="modal is-active" id="editTaskModal" >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <form onSubmit={this.submitHandler}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit Task</p>
                            <button className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="columns">
                                <div className="column is-11">
                                    <div className="field is-5">
                                        <div className="control">
                                            <input onChange={this.handleInput} className="input" name="task" type="text" placeholder="Enter new Task..." value={this.state.value} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" type="submit">Save changes</button>
                            <button className="button">Cancel</button>
                        </footer>
                    </form>
                </div>
            </div>
        );
        return (
            reactDom.createPortal(myModal, document.getElementById('extraView'))
        )
    }
}