import React from "react";
import {student} from './Student'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      data: student,
      title: 'WebBrain Academy',
      name: '',
      status: '',
      active: null,
    }
  }

  render() {
   const onFilter = (e) => {

    let res = student.filter((value) => value.name.toLowerCase().includes(e.target.value.toLowerCase()));
    this.setState({
      data: res,
    })
   };
   const onDelete = (id) => {
    console.log(id);
    let res = this.state.data.filter((value) => value.id !== id);
    this.setState({data: res});
   }
   const onChange = (event) => {


    this.setState({[event.target.name] : event.target.value});
   }
    const onAdd =() =>{
      let user = {
        id: this.state.data.length+1,
        name: this.state.name,
        status: this.state.status,
      };
      this.setState({
        data: [...this.state.data, user],
        name: '', 
        status: ''
      })
      console.log(user);

    }
    const onEdit = ({id, name, status}, isSave)  => {
      if(isSave){
        let res = this.state.data.map((value) => value.id === this.state.active.id ? {...value, name: this.state.name, status: this.state.status}: value)
        this.setState({active:null, data: res});
      } else {
      this.setState({
        name: name,
        status: status,
        active: {id, name, status},
      })
    }
    }
    
   
   
    return (
      <div>
        <h1>name: {this.state.name}</h1>
        <h1>status: {this.state.status}</h1>
        <input name="name" onChange={onChange} type="text" placeholder="name" />
        <input name="status" onChange={onChange} type="text" placeholder="status" />
        <button onClick={onAdd}>Add</button>
        <hr />
        <input onChange={onFilter} type="text" placeholder="Filter" />
        <table border='1' width='100%'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
        
        {
          this.state.data.map(({id, name, status})=>{
            return(
              <tr key={id}>
                <td>{id}</td>
                <td>{this.state.active?.id === id ? <input onChange={onChange} name='name' value={this.state.name} type="text" /> : name}</td>
                <td>{this.state.active?.id === id ? <input onChange={onChange} name='status' value={this.state.status} type="text" /> : status}</td>
                <td><button onClick={() => onDelete(id)}>delete</button></td>
                <td><button onClick={() => onEdit({id, name, status},this.state.active?.id === id )}>{this.state.active?.id === id ? 'save' : 'edit'}</button></td>
              </tr>
            )
          })
        }
        </tbody>
        </table>

      </div>
    )
  }
}

export default App;
