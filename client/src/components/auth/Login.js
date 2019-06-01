import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Login
export default () => {

    const [formData, updateFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e => {
        console.log('Success');
    }

    const { email, password } = formData;

    // Building purposes
    useEffect(() => {
        console.log(formData);
    })

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Don't Have An Account Yet? <Link to="/register">Register Now !</Link>
            </p>
        </Fragment>
    )
}
