import { useEffect, useState } from "react";
import Card from "../Card";
import axios, { AxiosHeaders } from "axios";

const User = () => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/user/courses");
    const allCourses = response.data.allCourses;
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = async () => {
    setShow((prev) => !prev);
    const response = await axios.get(
      `http://localhost:3000/user/purchasedCourses`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          username: localStorage.getItem("username"),
        },
      }
    );

    setPurchasedCourses(response.data.courses);
  };

  return (
    <>
      <div className="flex justify-end mr-12 mt-4">
        <button
          onClick={clickHandler}
          className="text-white border border-blue-500 py-2 px-4 rounded-lg mt-4 bg-blue-800"
        >
          Purchased Courses
        </button>
      </div>

      <div className="flex">
        <div>
          {courses.length === 0 ? (
            <>Loading.....</>
          ) : (
            <div className="flex justify-center w-[1000px] mt-[200px]">
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
        <div className={`flex justify-end ml-[270px] mt-4 w-[400px]`}>
          {show && (
            <div className="flex flex-col ">
              {purchasedCourses.map((t) => (
                <Card
                  id={t._id}
                  key={t._id}
                  title={t.title}
                  price={t.price}
                  description={t.description}
                  showButton={false}
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
