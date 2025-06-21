import { useEffect, useState } from 'react'

import cls from './App.module.css'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'

export interface IFilm {
  "id": number,
  "title": string,
  "director": string,
  "year": number,
  "genre": string,
  "rating": number
}
function App() {
  const [films, setFilms] = useState<IFilm[]>([])

  const navigate = useNavigate()

  const fetchFilms = () => {
    axios.get<IFilm[]>('https://server-test-daploy.onrender.com/movies').then(res => {
      setFilms(res.data)
    }).catch(err=>{console.log(err)}
    )
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  const addFilm = (info: Omit<IFilm, 'id'>) => {
    axios.post('https://server-test-daploy.onrender.com/movies', info).then(() => {
      fetchFilms()
    }).catch(err=>{console.log(err)}
    )
  }

  const deleteFilm = (id:number) => {
    axios.delete(`https://server-test-daploy.onrender.com/movies/${id}`).then(()=>{
      fetchFilms()
    }).catch(err=>{console.log(err)}
    )
  }

  const editFilm = (info: Omit<IFilm, 'id'>, id: number) => {
    axios.put(`https://server-test-daploy.onrender.com/movies/${id}`, info).then(()=>{
      fetchFilms()
    }).catch(err=>{console.log(err)}
    )
  }

  return (
    <div className={cls.container}>
      {films && films.map(el => {
        return (
          <div key={el.id} className={cls.item}>
            <div className={cls.itemTitle}>{el.title}</div>
            {el.director && <div className={cls.itemDirector}>{el.director}</div>}
            {el.year && <div className={cls.itemYear}>{el.year}</div>}
            {el.genre && <div className={cls.itemGenre}>{el.genre}</div>}
            {el.rating && <div className={cls.rating}>{el.rating}</div>}
            <button className={cls.itemDelete} onClick={()=>{deleteFilm(el.id)}}>Delete</button>
            <button className={cls.itemEdit} onClick={()=>{navigate(`/${el.id}`)}}>Edit</button>
          </div>
        )
      })}
      <Outlet context={{editFilm, addFilm}} />
      <div>
        <button className={cls.addButton} onClick={()=>{navigate('./add')}}>Add new film</button>
      </div>
    </div>
  )
}

export default App
