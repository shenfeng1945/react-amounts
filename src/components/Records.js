import React ,{Component} from 'react';
import Record from './Record';
import '../modules/css/Records.css'
export default class Records extends Component {
   render(){
       return(
         <table className="table" >
             <thead>
                 <tr>
                     <th>Data</th>
                     <th>Title</th>
                     <th>Amount($)</th>
                     <th>Actions</th>
                 </tr>
             </thead>
             <tbody>
                {this.props.dataSource.map(item=>{
                  return <Record data={item}
                                 key={item.key} 
                                 handleEdit={this.updateEditInput.bind(this)}
                                 deleteRecord={this.deleteRecord.bind(this)}/>
                })}
             </tbody>
         </table>
         
       )
   }
   updateEditInput(res){
      this.props.updateDataSource(res)
   }
   deleteRecord(key){
     this.props.deleteRecord(key)
   }
}