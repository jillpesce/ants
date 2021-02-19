import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'

export default function Home() {
    const { user, userType } = useContext(UserContext)

    useEffect(() => {
        if (userType === 'user') window.location.assign('/user')
        if (userType === 'org') window.location.assign('org')
    }, [userType])

    useEffect(() => {
        if (!user) return window.location.assign('/login')
    }, [user])

    return <div> loading ... </div>
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

    useEffect(() => {
        fetch(`http://localhost:5000/orgs/getOrgs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.text())
        .then((data) => {            
            var orgRes = JSON.parse(data);
            setOrgsList(orgRes.content);
    
        });
    }, [])

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
                                    link={org.link}
                                    image={org.image}
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
