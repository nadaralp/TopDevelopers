import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({ auth, post: { _id, text, name, avatar, user, likes, comments, date }, addLike, removeLike, deletePost, showActions }) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            className="round-img"
                            src={avatar}
                            alt="Avatar Picure"
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        Posted on {moment(date).format('MM-DD-YYYY')}
                    </p>

                    {
                        showActions && <Fragment>

                            <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-up"></i>
                                <span>{likes.length}</span>
                            </button>
                            <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${_id}`} className="btn btn-primary">
                                Discussion <span className='comment-count'>{comments.length}</span>
                            </Link>
                            {
                                !auth.loading && user === auth.user._id && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deletePost(_id)}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )
                            }
                        </Fragment>
                    }

                </div>
            </div>

        </Fragment>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    addLike,
    removeLike,
    deletePost
})(PostItem);
