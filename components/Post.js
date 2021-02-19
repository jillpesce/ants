import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'

const Post = ({
    _id,
    likes,
    title,
    description,
    location,
    type,
    org,
    userid,
}) => {
    const [buttonText, setButtonText] = useState()
    const { user, userType, updateUser } = useContext(UserContext)
    const [numLikes, setNumLikes] = useState((likes && likes.length) || 0)

    useEffect(() => {
        if (isEmpty(user)) return
        if (userType == 'user')
            setButtonText(user.liked.includes(_id) ? 'Liked' : 'Like')
    }, [user])

    //follow org
    function likePost() {
        if (!userid) {
            setErr('Only users can like posts')
            return
        }
        fetch('https://ants-senior-design.herokuapp.com/posts/like', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                userid,
                postid: _id,
            }),
        })
            .then((response) => response.json())
            .then(({ err, user, post }) => {
                if (err) console.log('Error liking post', err)
                else {
                    updateUser(user)
                    setNumLikes(post.likes.length)
                    setButtonText('Liked')
                }
            })
    }

    //unfollow org
    function unlikePost() {
        fetch('https://ants-senior-design.herokuapp.com/posts/unlike', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                userid,
                postid: _id,
            }),
        })
            .then((response) => response.json())
            .then(({ err, user, post }) => {
                if (err) console.log('Error liking post', err)
                else {
                    updateUser(user)
                    setNumLikes(post.likes.length)
                    setButtonText('Like')
                }
            })
    }

    return (
        <div className="post card">
            <a className="card-title" href={`/post/${encodeURIComponent(_id)}`}>
                {title}
            </a>
            <div className="card-tags">
                <span className="tag">
                    <p className="tag-label">Organization</p>
                    {org.name}
                </span>
                <span className="tag">
                    <p className="tag-label">Event Type</p>
                    {type.toLowerCase()}
                </span>
                <span className="tag">
                    <p className="tag-label">Location</p>
                    {location.toLowerCase()}
                </span>
                <span className="tag">
                    <p className="tag-label">Date</p>
                    date - date
                </span>
            </div>
            <div className="card-body">
                <label className="label">Description</label>{' '}
                <p className="card-text">{description}</p>
                <div className="is-flex is-justify-content-space-between">
                    <b className="card-text">{numLikes} Likes</b>
                    {userType == 'user' && (
                        <button
                            className="button yellow is-small is-rounded"
                            onClick={
                                buttonText == 'Like' ? likePost : unlikePost
                            }
                        >
                            {buttonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post
