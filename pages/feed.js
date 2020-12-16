import Header from '../components/Header'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash'
import Post from '../components/Post'

export default function Feed() {
    const [posts, setPosts] = useState([])
    const { user, userType, logout } = useContext(UserContext)

    useEffect(() => {
        if (isEmpty(user) || !user.following) return
        let allPosts = []
        for (const i in user.following) {
            const orgid = user.following[i]
            fetch(`http://localhost:5000/posts/${orgid}`)
                .then((resp) => resp.json())
                .then(({ posts, err }) => {
                    if (err) {
                        console.log('Error getting liked posts', err)
                    } else {
                        allPosts = allPosts.concat(posts)
                        setPosts(allPosts)
                    }
                })
                .catch((err) => {
                    console.log('Error getting orgs', err)
                })
        }
    }, [user])

    return (
        <div>
            <Header />
            <h1>Feed</h1>
            <p>Here are posts from the orgs that you follow!</p>
            {posts && posts.map((post) => <Post {...post} userid={user._id} />)}
            {!posts.length && (
                <p>No posts yet! Go to the home page to follow more orgs.</p>
            )}
        </div>
    )
}
