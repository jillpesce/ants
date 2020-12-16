import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Org from '../components/Org'
import Header from '../components/Header'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'

export default function Home() {
    const { user, userType } = useContext(UserContext)
    const [orgs, setOrgsList] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [create, setCreate] = useState()

    //get orgs
    useEffect(() => {
        if (userType && userType == 'user') {
            fetch(`https://ants-senior-design.herokuapp.com/orgs`)
                .then((resp) => resp.json())
                .then(({ data, err }) => {
                    if (err) {
                        console.log('Error getting orgs', err)
                    } else {
                        setOrgsList(data)
                    }
                })
                .catch((err) => {
                    console.log('Error getting orgs', err)
                })
        } else if (userType && userType == 'org') {
            fetchPosts()
        }
    }, [userType])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

    function fetchPosts() {
        fetch(`https://ants-senior-design.herokuapp.com/posts/${user._id}`)
            .then((resp) => resp.json())
            .then(({ posts, err }) => {
                if (err) {
                    console.log('Error getting posts', err)
                } else {
                    setPosts(posts)
                }
            })
            .catch((err) => {
                console.log('Error getting posts', err)
            })
    }

    if (!user) return <div />

    return (
        <div>
            <Header />
            <h1>
                {' '}
                Welcome {userType}, {user.username}{' '}
            </h1>

            {userType == 'user' ? (
                <div>
                    <hr></hr>
                    <h2>Recommended Orgs For You:</h2>
                    {orgs !== undefined ? (
                        orgs.map((org) => {
                            return (
                                <Org
                                    name={org.name}
                                    description={org.description}
                                    interests={org.interests}
                                    id={org._id}
                                    user={user.username}
                                />
                            )
                        })
                    ) : (
                        <p>No recommended orgs at this time</p>
                    )}
                </div>
            ) : (
                <div>
                    <p>This is an org page</p>
                    <button onClick={() => setCreate(true)}>
                        Create a Post
                    </button>
                    <CreatePost
                        create={create}
                        orgid={user._id}
                        close={() => {
                            setCreate(false)
                            fetchPosts()
                        }}
                    />
                    <h2> Your Posts </h2>
                    {posts && posts.map((post) => <Post {...post} />)}
                    {!posts.length && <p>Create a post to attract ants!</p>}
                </div>
            )}
        </div>
    )
}
