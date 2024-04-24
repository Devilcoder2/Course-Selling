import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const signinHandler = () => {
    navigate("/signin");
  };

  const signupHandler = () => {
    navigate("/signUp");
  };

  return (
    <div className="text-center mt-40">
      <div className="text-4xl text-blue-600 font-semibold mb-12">
        This is Udemy Clone Website
      </div>
      <div>
        <button
          className="border border-blue-800 bg-blue-500 px-6 py-4 rounded-lg mr-4"
          onClick={signinHandler}
        >
          SignIn
        </button>
        <button
          className="border border-blue-800 bg-blue-500 px-6 py-4 rounded-lg mr-4"
          onClick={signupHandler}
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default App;
