import React, { Component }  from 'react'
import './styles/style.css'
import Overview from './components/Overview';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      task: { text: '', index: 1 },
      tasks: []
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.editTask = this.editTask.bind(this)
  }

  handleInput(e) {
    this.setState(prev => {
      return {
        ...prev,
        task: { ...prev.task ,text: e.target.value }
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(e.target.previousSibling);
    const input = e.target.previousSibling
    if (input.value) {
      this.setState(prev => {
        return {
          tasks : [...prev.tasks, prev.task],
          task: {  text: '', index: prev.task.index + 1  }
        }
      })
    } else {
      return
    }
    input.value=''
  }

  deleteTask(id) {
    this.setState( prev => ({ ...prev, tasks: prev.tasks.filter(task => task.index !== id) }) )
  }

  editEnabled(e) {
    const inputLi = e.target.previousSibling.previousSibling
    inputLi.removeAttribute('disabled')
    inputLi.focus()
  }

  editDisabled(e) {
    const inputLi = e.target
    if (e.code === 'Enter') {
      inputLi.setAttribute('disabled', true)
    }
  }

  editTask(e, id) {
    const inputLi = e.target
    this.setState(prev => {
      return {
        ...prev,
        tasks: [...prev.tasks.map( task => {
          return task.index === id ? { text: inputLi.value, index: id } : task
        })]
      }
    })
  }



  render() {
    const listeners = {
      editEnabled : this.editEnabled,
      editTask: this.editTask,
      deleteTask : this.deleteTask,
      editDisabled: this.editDisabled
    }
    return (
        <div className='container'>
          <Header />
          <div className='app--wrapper'>
            <form>
              <label htmlFor="tasks-input">Enter a task </label>
              <div>
                <input type='text' id='tasks-input' onChange={this.handleInput} />
                <button onClick={ this.handleSubmit } >Add task</button>
              </div>
            </form>
            <Overview state={ this.state } actions={ listeners } />
          </div>
          <Footer />
      </div>
    )
  }
}

export default App;
