import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [role, setRole] = useState("user");
  const [active, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const adminClickHandler = () => {
    setActive(true);
    setRole("admin");
  };

  const userClickHandler = () => {
    setActive(false);
    setRole("user");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/${role}/signin`,
        {
          username,
          password,
        }
      );

      const token = response.data.token;

      localStorage.setItem("authorization", token);
      localStorage.setItem("username", username);

      if (response.data.msg === `${role} signin successfull`) {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (e) {
      alert(e.response.data.msg);
    }
  };

  const signinHandler = () => {
    navigate("/signUp");
  };

  const backHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <button
          onClick={backHandler}
          className="border border-gray-600 mt-4 ml-4 text-white px-6 py-4 rounded-lg mr-4 bg-gray-500"
        >
          Back
        </button>
      </div>
      <div className="text-center mt-12">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-blue-600">Log In</h1>
        </div>

        <div>
          <button
            className={`border border-blue-800 text-white px-6 py-4 rounded-lg mr-4 ${
              active === true ? "bg-blue-500" : "bg-blue-700"
            }`}
            onClick={userClickHandler}
          >
            User
          </button>
          <button
            className={`border border-blue-800 text-white px-6 py-4 rounded-lg mr-4 ${
              active === false ? "bg-blue-500" : "bg-blue-700"
            }`}
            onClick={adminClickHandler}
          >
            Admin
          </button>
        </div>

        <div>
          <form className="flex flex-col items-center" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="border border-blue-800 rounded-lg mr-2 mt-4 p-2 w-[400px]"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="border border-blue-800 rounded-lg mr-2 mt-4 p-2 w-[400px]"
            />

            <button
              type="submit"
              className="border border-blue-800 text-black px-6 py-4 rounded-lg mr-4 w-fit mt-4 bg-blue-100"
            >
              Submit
            </button>
          </form>
        </div>

        <div>
          <button
            onClick={signinHandler}
            className="border border-blue-800 text-white px-6 py-4 rounded-lg mr-4 bg-blue-500 mt-6"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
