import React from 'react'
import {Form, Field, ErrorMessage, withFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './form.css'

function NewUserForm({values, isSubmitting}) {
    console.log(isSubmitting)
    return (
        <Form className="new_user_form">
            <label>First Name</label>
            <Field name="first name" />
            <ErrorMessage name="first name" />
            <label>Last Name</label>
            <Field name="last name" />
            <ErrorMessage name="last name" />
            <label>Email</label>
            <Field type="email" name="email"/>
            <ErrorMessage name="email" />
            <label>Password</label>
            <Field type="password" name="password"/>
            <ErrorMessage name="password" />
            Terms of Agreement
            <Field type="radio" name="tos" value={values.agree} />Yes
            <Field type="radio" name="tos" value={values.agree} />No
            <button disabled={isSubmitting}>Submit</button>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: () => {
        return {
            ['first name']: '',
            ['last name']: '',
            email: '',
            password: '',
            agree: ''false''
        }
    },
    handleSubmit: (values, {resetForm}) => {
        axios
            .post("https:reqres.in/api/users", values)
            .then(res => {
                console.log(res)
                window.alert(`${res.data['first name']} was created at ${res.data.createdAt}`)
            })
            .catch(err => console.log(err))
        resetForm()
    },
    validationSchema: Yup.object().shape({
        ['first name']: Yup.string()
            .min(2, 'Too short for a first name')
            .max(20, 'Too long for a first name')
            .required('First name is required!'),
        ['last name']: Yup.string()
            .min(2, 'Too short for a last name')
            .max(20, 'Too long for a last name')
            .required('Last name is required!'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required!')
        
    })
})(NewUserForm)