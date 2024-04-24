import axios from "axios";

const Card = ({ title, price, description, id, showButton }) => {
  const clickHandler = async (id) => {
    console.log(id);
    const response = await axios.post(
      `http://localhost:3000/user/course/${id}`,
      {
        username: localStorage.getItem("username"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      }
    );
    console.log(response);
  };

  return (
    <>
      <div className="border rounded-lg mx-2 border-blue-800 mt-2 bg-blue-500 w-[200px] h-[150px] text-center py-2 ">
        <h1 className="text-white">{title}</h1>
        <h2 className="text-white">{price}</h2>
        <p className="text-white">{description}</p>
        {showButton && (
          <button
            onClick={() => clickHandler(id)}
            className="text-white border border-blue-500 py-2 px-4 rounded-lg mt-4 bg-blue-800"
          >
            Purchase this course
          </button>
        )}
      </div>
    </>
  );
};

export default Card;
