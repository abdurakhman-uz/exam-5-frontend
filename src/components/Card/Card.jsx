import { Link } from "react-router-dom"



const Card = ({ data, cars }) => {

  const withoutCar = (data) => {
    return (
      <Link
        to={`/cars/${data._id}`}
        key={data._id}
        style={{ position: "relative" }}
      >
        <div key={data._id} className={`w-[240px] h-[300px] bg-gray-100 rounded-xl relative flex justify-center`}>
          <img src={`${import.meta.env.VITE_BECKEND}/api/images/${data.image}`} className={`w-[210px] rounded-xl h-[180px] absolute top-4 object-cover`} />
          <h1 className={`absolute top-[220px] text-xl`}>{data.name}</h1>
        </div>
      </Link>
    )
  }

  const withCar = (data) => {
    return (
      <Link
        to={`/cars/info/${data._id}`}
        key={data._id}
      >
        <div key={data._id} className={`w-[240px] h-[300px] bg-gray-100 rounded-xl relative flex justify-center`}>
          <img src={`${import.meta.env.VITE_BECKEND}/api/cars/images/${data.cover}`} className={`w-[210px] rounded-xl h-[180px] absolute top-4 object-cover`} />
          <h1 className={`absolute top-[220px] text-xl`}>{data.name}</h1>
        </div>
      </Link>
    )
  }

  // cars ? withCar(data) : withoutCar(data)

  if(cars){
    return withCar(data)
  } else {
    return withoutCar(data)
  }
}

export default Card