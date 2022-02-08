import React, { useState } from "react";
import { useNavigate } from "react-router";
import UserSerivce from "../../user/service/UserService";
import { connect, useDispatch, useSelector } from "react-redux";
import UserAction from "../redux/UserAction";

function Login() {
    const [userName, setuserName] = useState();
    const [password, setpassword] = useState();
    const navigate = useNavigate();
    let service = new UserSerivce();
    let jumbotronStyle = {backgroundColor: "aliceblue"}
    const userId= useSelector((state)=>state.userId);
    const dispatch = useDispatch();
    React.useEffect(()=>{
      
    },[])
    return (
        <div>
            <div className="jumbotron text-center" style={jumbotronStyle}>
                <h3><i class="fas fa-paper-plane mr-1"></i>Supporting You Through Your Travel Journey</h3>
                <h5>Let the journey begin</h5>
            </div>
            <h1 className="my-4">Login</h1>
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" id="username" placeholder="Enter User Name"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" id="password" placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn btn-primary" onClick={
                        (e) => {
                            e.preventDefault();
                            service.loginService(userName, password).then((result) => {
                                if (result !== 0) {
                                    alert("Login credentials are valid.");
                                    dispatch(UserAction());
                                    service.getUserType(result.data).then((result1) => {
                                        //sessionStorage.setItem('userId', result.data);
                                       // sessionStorage.setItem('userType', result1.data);
                                        sessionStorage.setItem('userName',userName);
                                        dispatch(UserAction());
                                        if(sessionStorage.getItem('userName')!==null){
                                            
                                            //navigate("/booking/view");
                                            console.log(userId);
                                        }
                                       // window.location.reload();
                                    }).catch((e) => {
                                        alert('usertype not available')
                                    });
                                }
                            }).catch((error) => {
                                alert('Invalid Username/Password. Please try again!');
                                window.location.reload();

                            })
                        }
                    }>Login</button>
                    <button className="btn btn-success mx-2" onClick={(e) => { 
                        e.preventDefault();
                        navigate('/users/add');
                    }}>New Registration</button>
                </div>
            </form>
        </div>
    );
}

export default  Login;