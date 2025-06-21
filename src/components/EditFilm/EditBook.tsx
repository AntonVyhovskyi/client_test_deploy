import { useEffect, useState, type FunctionComponent } from 'react';
import cls from './EditBook.module.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { IFilm } from '../../App';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import axios from 'axios';
import { number, object, string } from 'yup';


interface EditFilmProps {

}

type MyContextType = {
    editFilm: (info: Omit<IFilm, 'id'>, id: number) => void
}

const EditBook: FunctionComponent<EditFilmProps> = () => {
    const [values, setValues] = useState<Omit<IFilm, 'id'> | null>(null)
    const { id } = useParams()

    const navigate = useNavigate()

    const { editFilm } = useOutletContext<MyContextType>()

    useEffect(() => {
        axios.get<IFilm[]>(`https://server-test-daploy.onrender.com/movies/${id}`).then((res) => {
            const { title, director, year, genre, rating } = res.data[0]
            setValues({ title, director, year, genre, rating })
            console.log(JSON.stringify(res.data));
            
        })
    }, [id])
    const validate = object({
        title: string().max(100),
        director: string().max(100),
        year: number().max(2100),
        genre: string().max(100),   
        rating: number().max(10)
    })


    return (
        <div className={cls.container}>
            {!values ? (
                <p>Loading...</p> // або spinner
            ) : ( <Formik
                initialValues={values}
                validationSchema={validate}
                onSubmit={(values) => {
                    editFilm(values, Number(id))
                    navigate('../')
                }}

            >
                <Form className={cls.form}>
                    <div className={cls.fieldGroup}>
                        <label htmlFor='title'>Title</label>
                        <Field type='text' name='title' id='title' />
                        <ErrorMessage name='title' component='div' className={cls.error} />
                    </div>

                    <div className={cls.fieldGroup}>
                        <label htmlFor='director'>Director</label>
                        <Field type='text' name='director' id='director' />
                        <ErrorMessage name='director' component='div' className={cls.error} />
                    </div>

                    <div className={cls.fieldGroup}>
                        <label htmlFor='year'>Year</label>
                        <Field type='number' name='year' id='year' />
                        <ErrorMessage name='year' component='div' className={cls.error} />
                    </div>

                    <div className={cls.fieldGroup}>
                        <label htmlFor='genre'>Genre</label>
                        <Field type='text' name='genre' id='genre' />
                        <ErrorMessage name='genre' component='div' className={cls.error} />
                    </div>

                    <div className={cls.fieldGroup}>
                        <label htmlFor='rating'>Rating</label>
                        <Field type='number' name='rating' id='rating' />
                        <ErrorMessage name='rating' component='div' className={cls.error} />
                    </div>

                    <button type='submit'>Submit</button>
                </Form>

            </Formik>
            )}

        </div>
    );
}

export default EditBook;