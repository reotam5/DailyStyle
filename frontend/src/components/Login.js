import { useState } from "react";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            UserName: username,
            Password: password
        };
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data)
        .then(res => {
            const {status, data} = res.data;
            if (status == 0) {
                var { token, userName } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('userName', userName);
                window.location.href = '/';
            } else {
                alert(data);
            }
        });
    }

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-md max-w-lg w-5/6 flex flex-col justify-center items-center bg-blue-100">
        <div className="font-bold text-2xl"> Login </div>{" "}
        <div className="flex flex-col gap-1 justify-center">
          <input
            type="username"
            className="form-control"
            placeholder="UserName"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
