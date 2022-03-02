import { useRef  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {
  let navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    var data = {
      UserName: usernameRef.current.value,
      Password: passwordRef.current.value,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data)
      .then((res) => {
        const { status, data } = res.data;
        if (status === 0) {
          var { token, userName } = data;
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          navigate("/");
        } else {
          toast.error(data);
        }
      })
      .catch((err)=>{
        toast.error(err.message);
      });
    
  };

  const handleRegister = (e) => {
    e.preventDefault();
    var data = {
      UserName: usernameRef.current.value,
      Password: passwordRef.current.value,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/register`, data)
      .then((res) => {
        const { status, data } = res.data;
        if (status === 0) {
          var { token, userName } = data;
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          navigate("/");
        } else {
          toast.error(data);
        }
      })
      .catch((err)=>{
        toast.error(err.message);
      });;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="username">
              UserName
            </label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              className="py-2 px-3 border border-gray-300 focus:border-green-300 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              className="py-2 px-3 border border-gray-300 focus:border-green-300 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleRegister} 
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-white text-green-600 ring-green-600 ring-1 border border-transparent rounded-md font-semibold hover:text-white hover:bg-green-600 focus:text-white focus:bg-green-600">
              Sign Up
            </button>

            <button 
              onClick={handleLogin}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:bg-green-700">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
