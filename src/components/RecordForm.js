import React,{Component} from 'react';
import {Input} from 'antd';
import '../modules/css/RecordForm.css'
import AllService from '../modules/js/allService'
export default class RecordForm extends Component {
    constructor(props){
     super(props)
     this.state = {
         date: '',
         title: '',
         amount: '',
     }
    }
    handleChange(e){
       let name = e.target.name
       let obj
       this.setState((
         obj= {},
         obj[''+name] = e.target.value,
         obj
       ))
    }
    addRecord(e){
       e.preventDefault();
       const data = {date:this.state.date,title:this.state.title,amount:parseInt(this.state.amount,0)}
       AllService.addRecord(data).then((res)=>{
          this.props.addRecord(res.data);
          this.setState({
              date:'',
              title:'',
              amount:''
          })
       })
    }
    render(){
        return (
          <form className="record-form" onSubmit={this.addRecord.bind(this)}>
             <Input placeholder="Data" name="date" 
                    value={this.state.date}
                    type="date"
                   onChange={this.handleChange.bind(this)}/> 
            <Input placeholder="Title" name="title" 
                   value={this.state.title}
                   onChange={this.handleChange.bind(this)}/>
            <Input placeholder="Amount" name="amount" 
                   value={this.state.amount}
                   onChange={this.handleChange.bind(this)}/>
             <Input type="submit"
                     value="Create Amount"
                     disabled={!this.valid()}/>
           </form>
           
        )
    }
    valid(){
        return this.state.date && this.state.title && this.state.amount
    }
}