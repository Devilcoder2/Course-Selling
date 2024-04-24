import { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/user/courses");
    const allCourses = response.data.allCourses;
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="ml-10 mt-4 ">
        <h1 className="text-4xl text-blue-700 font-semibold">Courses</h1>
        <div className="flex justify-end mr-12 mt-[-40px]">
          <Link to={"/user/purchasedcourses"}>
            <button className="text-white border border-blue-500 py-2 px-4 rounded-lg mt-4 bg-blue-800">
              Purchased Courses
            </button>
          </Link>
        </div>
      </div>

      <div className="flex">
        <div>
          {courses.length === 0 ? (
            <>Loading.....</>
          ) : (
            <div className="flex mt-24 ml-10 flex-wrap">
              {courses.map((t) => (
                <Card
                  id={t._id}
                  key={t._id}
                  title={t.title}
                  price={t.price}
                  description={t.description}
                  showButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
