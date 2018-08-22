const url = {
    getRecordList: '/api/v1/records/',
    addRecord: '/api/v1/records/',
    editRecord: '/api/v1/records/',
    deleteRecord: '/api/v1/records/'
}
const host = 'http://5b6d7d1dd8f3430014e796d6.mockapi.io'
for(let key in url){
    if(url.hasOwnProperty(key)){
      url[key] = host + url[key]  
    }
}
export default url