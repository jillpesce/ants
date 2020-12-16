import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Org from '../components/Org'
import Header from '../components/Header'
import CreatePost from '../components/CreatePost'

export default function Home() {
    const { user, userType } = useContext(UserContext)
    const [orgs, setOrgsList] = useState([]);

    //get orgs 
    useEffect(() => {
      fetch(`http://localhost:5000/orgs`)
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
        })}
    , [])

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })


    if (!user) return (<div/>)

    return (
        <div>
          <Header />
          <h1> Welcome {userType}, {user.username} </h1>

        {userType == 'user' ?
          <div>
          <hr></hr>
          <h2>Recommended Orgs For You:</h2>
          { orgs !== undefined ?
            orgs.map((org) => {
                return <Org name={org.name}
                  description={org.description}
                  interests = {org.interests}
                  id = {org._id}
                  user = {user.username}
                />;
            }) : <p>No recommended orgs at this time</p>
          }
          </div> : (
            <div>
              <p>This is an org page</p>
              <CreatePost orgid={user._id}/>
            </div>
          )
        }
        </div>
    )
}
