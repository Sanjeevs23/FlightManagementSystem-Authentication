import { useState } from "react";
import UserService from "../../user/service/UserService";

let service = new UserService();
let IntialState ={
    userId:0,    
}
var y=0;

let Name=sessionStorage.getItem('userName');
service.getUserByName(Name).then((result)=>{y=result.data;
}).catch((e)=>console.log(e));

function UserReducer(state=IntialState,action){
    if(action.type=='GET_USER'){
        return{
            userId : y,
           
        }
     }
     return state;
}
export default UserReducer;
