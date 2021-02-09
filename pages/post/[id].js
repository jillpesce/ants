import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useRouter } from 'next/router'

export default function PostPage() {
    const { user, userType, logout } = useContext(UserContext)
    const [post, setPost] = useState([])
    const [buttonText, setButtonText] = useState(['Like'])
    const [err, setErr] = useState()
    const router = useRouter()

    //get post content
    useEffect(() => {
        //get id from url
        if (router.query.id == undefined) return
        fetch(
            `https://localhost:5000/posts/post/${router.query.id}`
        )
            .then((resp) => resp.json())
            .then(({ postRes, err }) => {
                if (err) {
                    console.log('Error getting post', err)
                } else {
                    console.log(postRes)
                    setPost(postRes)
                    
                }
            })
            .catch((err) => {
                console.log('Error getting post', err)
            })
    }, [router])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

        //follow org
        function likePost() {
            if (!post.userid) {
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

    if (!user) return <div />

    return (
        <div>
            <Header />
            {post && (
                <div>
                    <h2>{post.title}'s event page</h2>
                    {userType == 'user' && (
                    <button
                        onClick={buttonText == 'Like' ? likePost : unlikePost}
                    >
                        {buttonText}
                    </button>
                )}
                {post.org && <a href={`/org/${encodeURIComponent(post.org._id)}`}>
                        by {post.org.name}
                </a>}
                {post.numLikes && <p>{post.numLikes} Likes</p>}
                {post.type && <p>Type of event: {post.type}</p>}
                {post.location && <p>Location: {post.location}</p>}
                {post.description && <p>Description: {post.description}</p>}
                {post.info && <p>More information about this event: {post.information}</p>}
                {post.link && <a href={post.link}>Read more here </a>}
                {post.startDate && post.endDate && <p>Time: {post.startDate} - {post.endDate}</p>}
                
                {err && (
                    <>
                        <p>{err}</p>
                        <br />
                    </>
                )}

        </div>
    )}
    </div>
)
        }
