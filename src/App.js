import React, { Component } from 'react';
import './App.css';
import Records from './components/Records'
import RecordForm from './components/RecordForm'
import AllService from './modules/js/allService'
import AmountBox from './components/AmountBox'

class App extends Component {
  state = {
     dataSource: []
  }
  componentDidMount(){
    AllService.getRecords().then(res=>{
       this.setState({
           dataSource: res.data
       })
    })
  }
  credits(){
      let array = this.state.dataSource.filter(item=>item.amount>=0)
      return array.reduce((pre,cur)=>{
          return pre+parseInt(cur.amount,0)
      },0)
  }
  debit(){
    let array = this.state.dataSource.filter(item=>item.amount<0)
    return array.reduce((pre,cur)=>{
        return pre+parseInt(cur.amount,0)
    },0)
  }
  balance(){
    return this.credits()+this.debit()
  }
  render() {
    return (
      <div className="App">
         <h2>Records</h2>
         <div className="row mb-3">
           <AmountBox text="Credits" type="success" amount={this.credits()}/>
           <AmountBox text="Debit" type="danger" amount={this.debit()}/>
           <AmountBox text="Balance" type="info" amount={this.balance()}/>
         </div>
         <RecordForm addRecord={this.addRecord.bind(this)}/>
         <Records dataSource={this.state.dataSource} 
                  deleteRecord={this.deleteRecord.bind(this)}
                  updateDataSource={this.updateObjectInArray.bind(this)}/>
      </div>
    );
  }
  updateObjectInArray(data){
     let array = this.state.dataSource
     let dataSource =  array.map(item=>{
         if(item.key !== data.key){
             return item
         }
         return {
             ...item,
             ...data
         }
     })
     this.setState({
        dataSource
    })
  }
  deleteObjectInArray(data){
    let array = this.state.dataSource
    let dataSource = array.filter(item=>data.key !== item.key)
    this.setState({dataSource})
  }
  deleteRecord(key){
      AllService.deleteRecord(key).then(res=>{
        this.deleteObjectInArray(res.data);
      })
  }
  addRecord(data){
    this.setState({
       dataSource: [
         ...this.state.dataSource,
         data
       ]
    })
 }
}

export default App;
