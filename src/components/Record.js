import React,{Component} from 'react';
import {Button} from 'antd';
import AllService from '../modules/js/allService';
export default class Record extends Component {
    constructor(props){
        super(props)
        this.state = {
            isEdit: false,
            forms: {
                date:'',
                title:'',
                amount:''
            }
        }
    }
    normalTr(){
        return (
            <tr>
              <td>{this.props.data.date}</td>
              <td>{this.props.data.title}</td>
              <td>{this.props.data.amount}</td>
              <td>
                <Button type="danger" 
                        onClick={this.changeEdit.bind(this)}
                        >Edit</Button>
                 <Button onClick={()=>this.props.deleteRecord(this.props.data.key)}>Delete</Button>
               </td>
            </tr>
          )
    }
    editTr(){
        return (
            <tr>
                <td><input ref="date"
                     defaultValue={this.props.data.date.split('T')[0]} /></td>
                <td><input ref="title"
                     defaultValue={this.props.data.title} /></td>
                <td><input ref="amount"
                     defaultValue={this.props.data.amount}/></td>
                <td>
                <Button type="danger" 
                        onClick={this.finishEdit.bind(this)}
                        >Finish</Button>
                 <Button onClick={this.changeEdit.bind(this)}>Cancle</Button>
                </td>
            </tr>
           )
    }
    
   render(){
      if(this.state.isEdit){
          return this.editTr()
      }else {
          return this.normalTr()
      }
   }
   changeEdit(){
       this.setState({
           isEdit: !this.state.isEdit
       })
   }
  finishEdit(){
    const data = {
        date: this.refs.date.value,
        title: this.refs.title.value,
        amount: parseInt(this.refs.amount.value,0)
    }
    AllService.editRecord(this.props.data.key,data).then( res=>{
       this.props.handleEdit(res.data)
       this.setState({isEdit:false})
    })
  } 
}