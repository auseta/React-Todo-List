import React, { Component } from 'react';

export default class Overview extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className='tasks--list' >
        { this.props.state.tasks.map( (task) => {
          return (
            <li key={ task.index } id={ task.index.toString() } >
              <input type='text' onChange={ (e) => this.props.actions.editTask(e, task.index) }  onKeyDown={(e) => this.props.actions.editDisabled(e)} value={ task.text } disabled />
              <i onClick={ () => this.props.actions.deleteTask(task.index) }  className="fa-solid fa-trash"></i>
              <i onClick={ (e) => this.props.actions.editEnabled(e,task.index) } className="fas fa-edit"></i>
            </li>
          )
        }) }        
      </ul>
    )
  }
}