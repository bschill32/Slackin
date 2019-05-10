import React, {useState} from 'react';
import {connect} from 'react-redux';
import {register} from '../../Ducks/userReducer';
import {Link} from 'react-router-dom';

function Register(props) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirm_password: '',
    user_display_name: '',
    last_name: '',
    first_name: ''
  });

  function userInfoHandle(e){
    const {name, value} = e.target;
    console.log(userInfo[name])
    setUserInfo({
      ...userInfo,
      [name]:value
    });
    console.log(userInfo[name]);
  };

  function handleRegister(e){
    e.preventDefault();
    const {email, password, confirm_password, user_display_name, last_name, first_name} = userInfo;
    if(password === confirm_password) {
      console.log(email)
      props.register({email, password, user_display_name, last_name, first_name});
    } else {
      alert('passwords not matching');
    };
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input name="email" placeholder="email" onChange={(e)=>{userInfoHandle(e)}} />
        <input name="password" palceholder="password" onChange={(e)=>{userInfoHandle(e)}} />
        <input name="confirm_password" placeholder="confirm your password" onChange={(e)=>{userInfoHandle(e)}} />
        <input name="user_display_name" placeholder="" onChange={(e)=>{userInfoHandle(e)}} />
        <input name="first_name" placeholder="first name" onChange={(e)=>{userInfoHandle(e)}} />
        <input name="last_name" placeholder="last name" onChange={(e)=>{userInfoHandle(e)}} />
        <button onClick={(e)=> handleRegister(e)}>Login</button>
        <Link to="/">Click here to login</Link>
      </form>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState.userReducer;

export default connect (mapStateToProps, {register})(Register);
