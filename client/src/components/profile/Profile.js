import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
            {loading || profile === null ? <Spinner />
                :
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">Go Back</Link>
                    {
                        auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                        <Link className="btn btn-dark" to="/edit-profile">Edit Profile
                        </Link>
                    }
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {
    getProfileById
})(Profile);
