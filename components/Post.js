import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'

const Post = (props) => {
    const [buttonText, setButtonText] = useState()
    const { user, userType, updateUser } = useContext(UserContext)
    const [numLikes, setNumLikes] = useState(
        (props.likes && props.likes.length) || 0
    )

    const { _id, title, description, location, type, org, userid } = props

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
        fetch('http://localhost:5000/posts/like', {
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
        fetch('http://localhost:5000/posts/unlike', {
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
            .then(({ err, user }) => {
                if (err) console.log('Error liking post', err)
                else {
                    updateUser(user)
                    setNumLikes(post.likes.length)
                    setButtonText('Like')
                }
            })
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {type} by{' '}
                    <a href={`/org/${encodeURIComponent(org._id)}`}>
                        {org.name}
                    </a>{' '}
                    in {location}
                </h6>
                <p className="card-text">Description: {description}</p>
                {userType == 'user' && (
                    <button
                        onClick={buttonText == 'Like' ? likePost : unlikePost}
                    >
                        {buttonText}
                    </button>
                )}
                <p>{numLikes} Likes</p>
            </div>
        </div>
    )
}

export default Post
