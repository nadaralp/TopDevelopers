import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ deleteExperience, experience }) => {
    const experiences = experience.map((exp) => (<tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td><Moment format="YYYY-MM-DD">{exp.from}</Moment > - {
            exp.to === null ? (' Now') : (<Moment format="YYYY-MM-DD">{exp.to}</Moment>)
        }</td>
        <td><button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button></td>
    </tr>))
    return (
        <Fragment>
            <h2 className="my-2">Experience credentials</h2>
            {
                experiences.length !== 0 ? (<Fragment>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th className="hide-sm">Title</th>
                                <th>Years</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences}
                        </tbody>
                    </table>
                </Fragment>) : (<p className="mx-1">Please add experience to show up</p>)
            }

        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {
    deleteExperience
})(Experience)
