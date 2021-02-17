import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import Moment from 'moment'

export default function PostPage() {
    const { user, userType, updateUser, logout } = useContext(UserContext)
    const [post, setPost] = useState([])
    const [buttonText, setButtonText] = useState()
    const [err, setErr] = useState()
    const router = useRouter()
    const [orgName, setOrgName] = useState()
    const [numLikes, setNumLikes] = useState()

    //set liked or not
    useEffect(() => {
        if (isEmpty(user)) return
        if (userType == 'user')
            setButtonText(user.liked.includes(post._id) ? 'Liked' : 'Like')
    }, [user, post])

    //get post content
    useEffect(() => {
        //get id from url
        if (router.query.id == undefined) return
        fetch(
            `https://ants-senior-design.herokuapp.com/posts/post/${router.query.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((resp) => resp.text())
            .then((postRes) => {
                postRes = JSON.parse(postRes)
                setPost(postRes.post)
                setNumLikes(postRes.post.likes.length)
                console.log(post)
            })
            .catch((err) => {
                console.log('Error getting post', err)
            })
    }, [router])

    //get org
    useEffect(() => {
        //get id from url
        if (post == undefined) return
        fetch(`https://ants-senior-design.herokuapp.com/orgs/${post.org}`)
            .then((resp) => resp.json())
            .then(({ account, err }) => {
                if (err) {
                    console.log('Error getting orgs', err)
                } else {
                    console.log(account)
                    setOrgName(account.name)
                    console.log('user: ' + user)
                }
            })
            .catch((err) => {
                console.log('Error getting orgs', err)
            })
    }, [post])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

    //follow org
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
                postid: post._id,
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
                userid: user._id,
                postid: post._id,
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
                    {post.org && (
                        <p>
                            by{' '}
                            <a href={`/org/${encodeURIComponent(post.org)}`}>
                                {orgName}
                            </a>
                        </p>
                    )}
                    {userType == 'user' && (
                        <button
                            onClick={
                                buttonText == 'Like' ? likePost : unlikePost
                            }
                        >
                            {buttonText}
                        </button>
                    )}
                    <br></br>
                    <br></br>

                    {post.numLikes && <p>{post.numLikes} Likes</p>}
                    {post.type && <p>Type of event: {post.type}</p>}
                    {post.location && <p>Location: {post.location}</p>}
                    {post.startDate && post.endDate && (
                        <p>
                            {Moment(post.startDate).format(
                                'dddd, MMMM Do YYYY, h:mm a'
                            )}{' '}
                            -{' '}
                            {Moment(post.endDate).format(
                                'dddd, MMMM Do YYYY, h:mm a'
                            )}
                        </p>
                    )}
                    {post.description && <p>Description: {post.description}</p>}
                    {post.information && (
                        <p>
                            More information about this event:{' '}
                            {post.information}
                        </p>
                    )}
                    {post.link && <a href={post.link}>Read more here </a>}

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
