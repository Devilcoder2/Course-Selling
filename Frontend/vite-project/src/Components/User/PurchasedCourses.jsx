import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:3000/user/purchasedCourses",
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          username: localStorage.getItem("username"),
        },
      }
    );

    setCourses(response.data.courses);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const backHandler = () => {
    navigate("/user");
  };

  return (
    <>
      {courses.length === 0 ? (
        <div className="ml-10 mt-4 flex justify-between">
          <h1 className="text-4xl text-blue-700 font-semibold">
            No course! Please Purchase a Course First
          </h1>
        </div>
      ) : (
        <div>
          <div className="ml-10 mt-4 flex justify-between">
            <h1 className="text-4xl text-blue-700 font-semibold">
              Purchased Courses
            </h1>
            <button
              onClick={backHandler}
              className="border border-gray-600 ml-4 text-white px-6 py-4 rounded-lg mr-12  bg-gray-500"
            >
              Back
            </button>
          </div>
          <div className="flex ml-10 mt-10 flex-wrap">
            {courses.map((t) => (
              <Card
                title={t.title}
                price={t.price}
                key={t.id}
                id={t.id}
                description={t.description}
                showButton={false}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PurchasedCourses;
