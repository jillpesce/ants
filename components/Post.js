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
                                onClick={
                                    _likes.includes(user._id)
                                        ? unlikePost
                                        : likePost
                                }
                            >
                                {_likes.includes(user._id) ? 'Unlike' : 'Like'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post
