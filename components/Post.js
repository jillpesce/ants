import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'
import moment from 'moment'

const Post = ({
    _id,
    likes,
    title,
    description,
    location,
    type,
    org,
    startDate,
    endDate,
}) => {
    const { user, userType, updateUser } = useContext(UserContext)
    const [_likes, setLikes] = useState(likes)
    const [_deleted, setDeleted] = useState(false)

    function likePost() {
        if (!user) {
            setErr('Only users can like posts')
            return
        }
        fetch('https://ants-senior-design.herokuapp.com/posts/like', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                userid: user._id,
                postid: _id,
            }),
        })
            .then((response) => response.json())
            .then(({ err, user, post }) => {
                if (err) console.log('Error liking post', err)
                else {
                    updateUser(user)
                    setLikes(post.likes)
                }
            })
    }

    function unlikePost() {
        fetch('https://ants-senior-design.herokuapp.com/posts/unlike', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                userid: user._id,
                postid: _id,
            }),
        })
            .then((response) => response.json())
            .then(({ err, user, post }) => {
                if (err) console.log('Error liking post', err)
                else {
                    updateUser(user)
                    setLikes(post.likes)
                }
            })
    }

    function deletePost() {
        fetch('https://ants-senior-design.herokuapp.com/posts/delete', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                orgid: org._id,
                postid: _id,
            }),
        })
            .then((response) => response.json())
            .then(({ err, org, post }) => {
                if (err) console.log('Error deleting post', err)
                else {
                    setDeleted(true)
                }
            })
    }
    if (_deleted) return <div></div>
    return (
        <div
            className="post card"
            onClick={() => window.location.assign(`/post/${_id}`)}
        >
            <p className="card-title">{title}</p>
            <div className="tags-container">
                <span
                    className="tag clickable"
                    onClick={(e) => {
                        e.stopPropagation()
                        window.location.assign(`/org/${org._id}`)
                    }}
                >
                    <p className="tag-label">Organization</p>
                    {org.name}
                </span>
                <span className="tag">
                    <p className="tag-label">Event Type</p>
                    {type.toLowerCase()}
                </span>
                <span className="tag">
                    <p className="tag-label">Location</p>
                    {location === 'DC' || location === 'NYC'
                        ? location
                        : location.toLowerCase()}
                </span>
                <span className="tag">
                    <p className="tag-label">Date</p>
                    {moment(startDate).format('MMM Do, YYYY')} -{' '}
                    {moment(endDate).format('MMM Do, YYYY')}
                </span>
            </div>
            <div className="card-body">
                <label className="label">Description</label>
                <p className="card-text">{description}</p>
                <div className="is-flex is-justify-content-space-between">
                    <b className="card-text">{_likes.length} Likes</b>
                    {userType === 'user' && (
                        <div className="is-flex justify-content-flex-end">
                            <button
                                className="button yellow"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (_likes.includes(user._id)) unlikePost()
                                    else likePost()
                                }}
                            >
                                {_likes.includes(user._id) ? 'Unlike' : 'Like'}
                            </button>
                        </div>
                    )}

                    {userType === 'org' && (
                        <div className="is-flex justify-content-flex-end">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deletePost()
                                }}
                            > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post
