import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import css from "./Home.module.css";

const Home = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BECKEND}/api/models/`).then(res => res.json()).then(data => setData(data.models))
  }, [])

  return (
    <>
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