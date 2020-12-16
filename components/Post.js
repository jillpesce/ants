import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'

const Post = (props) => {
  const [buttonText, setButtonText] = useState()
  const [err, setErr] = useState('')
  const { user, updateUser } = useContext(UserContext)

    const { _id, title, description, location, type, org, userid } = props

    useEffect(() => {
      if(isEmpty(user)) return
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
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userid,
        postid: _id,
      })
    }).then((response) => response.json())
    .then(({ err, user }) => {
      if (err) console.log('Error liking post', err)
      else {
        updateUser(user)
        setButtonText('Liked')
      }
    })
  }

  //unfollow org
  function unlikePost() {
    fetch('http://localhost:5000/posts/unlike', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userid,
        postid: _id,
      })
    }).then((response) => response.json())
    .then(({ err, user }) => {
      if (err) console.log('Error liking post', err)
      else {
        updateUser(user)
        setButtonText('Like')
      }
    })
  }


  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {type} by {org.name} in {location}
        </h6>
        <p className="card-text">Description: {description}</p>
        <button onClick={buttonText == "Like" ? likePost : unlikePost}>{buttonText}</button>
        { err && <p>{err}</p>}
      </div>
    </div>
  )
}

export default Post
