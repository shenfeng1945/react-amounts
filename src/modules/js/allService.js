import url from './api'
import axios from 'axios'

export default class AllService {
    static getRecords(){
        return axios.get(url.getRecordList)
    }
    static addRecord(data){
        return axios.post(url.addRecord,data)
    }
    static editRecord(id,data){
        return axios.put(url.editRecord+id,data) 
    }
    static deleteRecord(id){
        return axios.delete(url.deleteRecord+id)
    }
}