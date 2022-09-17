const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/data',(req,res)=>{
  res.send({
      status:200,
      msg:'获取数据成功',
      list:[
          {
              id:1,name:'安度',price:132,status:true,num:1
          },{
            id:2,name:'1度',price:133,status:true,num:2
        },{
            id:3,name:'2度',price:335,status:true,num:1
        },{
            id:4,name:'3度',price:243,status:false,num:1
        },{
            id:5,name:'4度',price:847,status:true,num:1
        },{
            id:6,name:'5度',price:92,status:true,num:1
        },{
            id:7,name:'6度',price:48,status:true,num:1
        }
      ]
  })
})
app.listen(80,()=>{
  console.log('express running at localhost');
})