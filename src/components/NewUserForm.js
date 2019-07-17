import React from 'react'
import {Form, Field, ErrorMessage, withFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './form.css'

function NewUserForm({values, errors, touched, isSubmitting}) {
    return (
        <Form className="new_user_form">
            <div className="field_div">
                <label>First Name</label>
                <Field name="firstName" autoComplete="off" className={errors.firstName && touched.firstName ? 'invalid' : ''}/>
                <p className="error-text"><ErrorMessage name="firstName" /></p>
            </div>
            <div className="field_div">
                <label>Last Name</label>
                <Field name="lastName" autoComplete="off" className={errors.lastName && touched.lastName? 'invalid' : ''}/>
                <p className="error-text"><ErrorMessage name="lastName" /></p>
            </div>
            <div className="field_div">
                <label>Email</label>
                <Field type="email" name="email" autoComplete="off" className={errors.email && touched.email ? 'invalid' : ''}/>
                <p className="error-text"><ErrorMessage name="email" /></p>
            </div>
            <div className="field_div">
                <label>Password</label>
                <Field type="password" name="password" className={errors.password && touched.password ? 'invalid' : ''}/>
                <p className="error-text"><ErrorMessage name="password" /></p>
            </div>
            <div className="field_div">
                <p className="tos">Do you agree with the Terms of Agreement?</p>
                <div className="tos_div">
                    <Field type="radio" name="agree" value="Yes" checked={values.agree==='Yes'} />Yes
                    <Field type="radio" name="agree" value="No" checked={values.agree==='No'} />No
                </div>
            </div>
            <button className="submit-button" disabled={isSubmitting}>Submit</button>
            {isSubmitting && <h4>Signing up user...</h4>}
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: () => {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            agree: '',
        }
    },
    handleSubmit: (values, {resetForm}) => {
        axios
            .post("https:reqres.in/api/users", values)
            .then(res => {
                window.alert(`${res.data.firstName} was signed up at ${res.data.createdAt}`)
                resetForm()
            })
            .catch(err => console.log(err))
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too short for a first name')
            .max(20, 'Too long for a first name')
            .required('First name is required!'),
        lastName: Yup.string()
            .min(2, 'Too short for a last name')
            .max(20, 'Too long for a last name')
            .required('Last name is required!'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required!'),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required('Password is required!')

        
    })
})(NewUserForm)