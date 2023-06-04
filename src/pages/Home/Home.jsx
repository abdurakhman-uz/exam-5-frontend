import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import css from "./Home.module.css";

const Home = () => {

  const [data, setData] = useState([])
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BECKEND}/api/models/`).then(res => res.json()).then(data => setData(data.models))
  }, [])

  return (
    <>
      {
        !token ?
        (
          <Link to="/login" className=" absolute top-4 right-4 text-white text-lg py-2 px-4 bg-[#4096ff] rounded-lg">Login</Link>
        )
        : null
      }
      <div className={`${css.container} flex mt-20`}>
        <div className={`${css.wrapper}`}>
          {
            data.length > 0 ? data.map(datas => <Card data={datas} />) : null
          }
        </div>
      </div>
    </>
  )
}

export default Home