import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

function Dashboard({ deleteAccount, getProfile, auth: { user }, profile: { profile, loading } }) {

    useEffect(() => {
        getProfile();
    }, [])

    return (
        loading && profile === null ? <Spinner /> :
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead"><i className="fas fa-user"></i>{'  '}Welcome {user && user.name} </p>
                {
                    profile !== null
                        ?
                        <Fragment>
                            <DashboardActions />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />

                            <div className="my-2">
                                <button className="btn btn-danger" onClick={e => deleteAccount()}>
                                    <i className="fas fa-user-minus"></i>{'  '}Delete My Account
                                </button>
                            </div>
                        </Fragment>
                        :
                        <Fragment>
                            <p className="">You haven't set up a profile yet, please add some info</p>
                            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                        </Fragment>
                }
            </Fragment>
    )
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {
    getProfile,
    deleteAccount
})(Dashboard);

