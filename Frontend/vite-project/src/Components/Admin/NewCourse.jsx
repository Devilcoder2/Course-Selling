import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/admin/course",
      {
        title,
        description,
        price,
      },
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      }
    );

    alert("Course Created SuccessFully");
    setTitle("");
    setDescription("");
    setPrice("");
  };

  const backHandler = () => {
    navigate("/admin");
  };

  return (
    <>
      <div>
        <button
          onClick={backHandler}
          className="mt-10  ml-10 border border-gray-600  text-white px-6 py-4 rounded-lg mr-12  bg-gray-500"
        >
          Back
        </button>
        <div className="text-center my-10">
          <h1 className="text-4xl text-blue-700 font-semibold">
            Create a New Course
          </h1>
        </div>

        <div>
          <form className="flex flex-col items-center" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              className="border border-blue-800 rounded-lg mr-2 mt-4 p-2 w-[400px]"
              value={title}
              onChange={titleHandler}
            />
            <input
              type="text"
              placeholder="Description"
              className="border border-blue-800 rounded-lg mr-2 mt-4 p-2 w-[400px]"
              value={description}
              onChange={descriptionHandler}
            />
            <input
              type="text"
              placeholder="Price"
              className="border border-blue-800 rounded-lg mr-2 mt-4 p-2 w-[400px]"
              value={price}
              onChange={priceHandler}
            />

            <button
              className="border border-blue-800 text-white px-6 py-4 rounded-lg mr-4 bg-blue-500 mt-6"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewCourse;
