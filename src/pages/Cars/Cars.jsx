import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Card from "../../components/Card/Card"
import css from "./Cars.module.css"


const Cars = () => {
    const params = useParams()
    const backend = import.meta.env.VITE_BECKEND

    const [cars, setCars] = useState([])

    useEffect(() => {
        fetch(backend + `/api/cars/${params.id}`)
            .then((res) => res.json())
            .then(data => {
                setCars(data.cars)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Link to="/login" className=" absolute top-4 right-4 text-white text-lg py-2 px-4 bg-[#4096ff] rounded-lg">Login</Link>
            <div className={`${css.container} flex mt-20`}>
                <div className={`${css.wrapper}`}>
                    {
                        cars.length > 0 ? cars.map(car => <Card data={car} cars />) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Cars