import express from 'express';
import path from 'path';
import routes from  './routes';
import {errors} from 'celebrate';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/assets',express.static(path.resolve(__dirname,'../assets')))
app.use(errors);
app.listen(3333);

// const users = [
//     'rafa',
//     'paiva'
// ]
// app.get('/users',(req,res)=> {
//     const search = String(req.headers.head);

//     const filteredusers = search ? users.filter(user => user.includes(search)) : users; 
//   return  res.json(filteredusers);
// })

// app.get('/users/:i',(req,res)=>{
//     const id = Number(req.params.i);

//     const user = users[id];

//     return res.json(user);
// })