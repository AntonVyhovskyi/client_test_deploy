

import { type FunctionComponent } from 'react';
import cls from './AddFilm.module.css'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { IFilm } from '../../App';

import { number, object, string } from 'yup';
import { useNavigate, useOutletContext } from 'react-router-dom';

interface AddFilmProps {

}

type MyContextType = {
    addFilm: (info: Omit<IFilm, 'id'>) => void
}

const AddFilm: FunctionComponent<AddFilmProps> = () => {

    const validate = object({
        title: string().max(100),
        director: string().max(100),
        year: number().max(2100),
        genre: string().max(100),
        rating: number().max(10)
    })
    const navigate = useNavigate()
    const { addFilm } = useOutletContext<MyContextType>()

    return (
        <div className={cls.container}>
            <Formik
                initialValues={{ title: '', director: '', year: 2000, genre: '', rating: 0 }}
                validationSchema={validate}
                onSubmit={(values) => {
                    addFilm(values)
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


        </div>
    );
}

export default AddFilm;