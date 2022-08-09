import ReactDOM from 'react-dom';
import React from 'react';
import './index.css'
//Watch video at 2 hrs 20 mins
class AddTask extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            taskDesc: ''
        }
    }
    handleAddTaskClick(){
        
        this.props.handlerToCollectTaskInfo(this.state.taskDesc);
        this.setState({
            taskDesc: ''
        })
    }
    handleTaskTextChange(e){
        this.setState({
            taskDesc: e.target.value
        })
    }
    render(){
        return(
            <form>
                <input type="text" value={this.state.taskDesc} onChange={(e) => this.handleTaskTextChange(e)} />
                <input type="button" value="add Task" onClick={() => this.handleAddTaskClick()}/>
            </form>
        )
    }
}
class TaskList extends React.Component{
    handleTaskClick(taskDesc){
        this.props.handlerToCollectTaskClickInfo(taskDesc);
    }
    render(){
        let list = [];
        for(let i = 0; i < this.props.tasks.length; i++){
            let task = this.props.tasks[i];
            let spanAction;
            if(task.isFinished){
                spanAction = (
                    <span class="material-icons" onClick={() => this.handleTaskClick(task.desc)}>close</span>
                );
            }else{
                spanAction = (
                    <span class="material-icons" onClick={() => this.handleTaskClick(task.desc)}>done</span>
                );
            }
            let listItem = (
                <div key={i}>
                    <spam>{task.desc}</spam>
                    {spanAction}
                </div> 
            );
            list.push(listItem);
        }
        return(
            <div className={this.props.forStyling}>
                <div className='list-container'>
                    <div className='title'>{this.props.purpose}</div>
                    <div className='content'>
                        {list}
                    </div>
                </div>
            </div>
            //props are used to transfer info from parent component to child component
        )

    }
}
class App extends React.Component {//This represents the whole page
    constructor(props){
        super(props);

        this.state = {
            tasks : [
                // {
                //     desc:"Switch off Light",
                //     isFinished:false
                // },{
                //     desc:"Turn on fan",
                //     isFinished:true
                // },{
                //     desc:"Make tea",
                //     isFinished:false
                // },{
                //     desc:"Make Dinner",
                //     isFinished:true
                // }
            ]
        }
    }
    handleNewTask(taskDesc){
        let oldTasks = this.state.tasks.slice(); //This gives the copy of tasks
        oldTasks.push({
            desc: taskDesc,
            isFinished: false
        });
        this.setState({
            tasks: oldTasks
        })
    }
    handleTaskStatusUpdate(taskDesc, newStatus){
        let oldTasks = this.state.tasks.slice();

        let taskItem = oldTasks.find(ot => ot.desc === taskDesc);
        taskItem.isFinished = newStatus;

        this.setState({
            tasks: oldTasks
        })
    }
    render(){
        let tasks = this.state.tasks;
        let todoTasks = tasks.filter(t => t.isFinished === false);
        let doneTasks = tasks.filter(t => t.isFinished === true);

        return (
                //This is called JSX- We have inserted JS code in HTML
               <>
                    <div className='add-task'>
                        <AddTask handlerToCollectTaskInfo={(taskDesc) => this.handleNewTask(taskDesc)}/>
                    </div>
                    <div className='task-lists'>
                        <TaskList handlerToCollectTaskClickInfo={(taskDesc) => this.handleTaskStatusUpdate(taskDesc, true)} tasks={todoTasks} purpose="Tasks to do" forStyling="todo" />
                        <TaskList handlerToCollectTaskClickInfo={(taskDesc) => this.handleTaskStatusUpdate(taskDesc, false)} tasks={doneTasks} purpose="Finished tasks" forStyling="finished"/>
                    </div>
                    
               </>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));


