import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import moment from 'moment'
import CreatePost from '../../components/CreatePost'


export default function PostPage() {
    const { user, userType, updateUser, logout } = useContext(UserContext)
    const [post, setPost] = useState()
    const [err, setErr] = useState()
    const [update, setUpdate] = useState()
    const router = useRouter()

    //get post content
    useEffect(() => {
        //get id from url
        if (!router.query.id) return
        fetch(
            `https://ants-senior-design.herokuapp.com/posts/post/${router.query.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((resp) => resp.json())
            .then(({ post }) => {
                setPost(post)
            })
            .catch((err) => {
                console.log('Error getting post', err)
            })
    }, [router.query])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

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
                    setPost(post)
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
                postid: post._id,
            }),
        })
            .then((response) => response.json())
            .then(({ err, user, post }) => {
                if (err) console.log('Error liking post', err)
                else {
                    updateUser(user)
                    setPost(post)
                }
            })
    }

    if (!user || !post)
        return (
            <div className="loading">
                <p>LOADING....</p>
            </div>
        )

    return (
        <div>
            <Header />
            <div className="page-body">
                <div className="section-header">
                    <h1>{post.title}</h1>
                    <a href={`/org/${post.org._id}`}>Post by {post.org.name}</a>
                </div>
                <div className="section-body">
                    <div className="tags-container">
                        <span className="tag">
                            <p className="tag-label">Organization</p>
                            {post.org.name}
                        </span>
                        <span className="tag">
                            <p className="tag-label">Event Type</p>
                            {post.type.toLowerCase()}
                        </span>
                        <span className="tag">
                            <p className="tag-label">Location</p>
                            {post.location === 'DC' || post.location === 'NYC'
                                ? post.location
                                : post.location.toLowerCase()}
                        </span>
                        {post.startDate && post.endDate && (
                            <span className="tag">
                                <p className="tag-label">Date</p>
                                {moment(post.startDate).format(
                                    'MMM Do, YYYY'
                                )}{' '}
                                - {moment(post.endDate).format('MMM Do, YYYY')}
                            </span>
                        )}
                    </div>

                    <label className="label">Description</label>
                    <p className="text">{post.description}</p>
                    {post.information && (
                        <>
                            <label className="label">Information</label>
                            <p className="text">{post.information}</p>
                        </>
                    )}
                    {post.volunteerInformation && (
                        <>
                            <label className="label">
                                Volunteer Information
                            </label>
                            <p className="text">{post.volunteerInformation}</p>
                        </>
                    )}
                    {post.link && (
                        <div>
                            <label className="label">Link</label>
                            <a href={post.link}>Find out more</a>
                        </div>
                    )}

                    {err && <p className="error">{err}</p>}
                    <br />
                    {userType === 'user' && (
                        <div className="is-flex justify-content-flex-end">
                            <button
                                className="button yellow"
                                onClick={
                                    post.likes.includes(user._id)
                                        ? unlikePost
                                        : likePost
                                }
                            >
                                {post.likes.includes(user._id)
                                    ? 'Unlike'
                                    : 'Like'}
                            </button>
                        </div>
                    )}
                    {
                        userType !== 'user' && 
                            (update ? 
                            <CreatePost
                                orgid={user._id}
                                close={() => {
                                setUpdate(false)}}
                                postValues = {post}
                                edit = {true}
                    /> : 
                            <button
                                className="button yellow"
                                onClick={() => setUpdate(true)}
                            >
                                Edit
                            </button> )
                    }

                    <b>{post.likes.length || 0} Likes</b>
                </div>
            </div>
        </div>
    )
}
