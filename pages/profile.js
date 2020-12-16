import Header from '../components/Header'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import { isEmpty } from 'lodash';
import Org from '../components/Org'


export default function Profile() {
    const { user, userType, logout } = useContext(UserContext)
    const [followedOrgs, setFollowedOrgsList] = useState([]);

    //get list of orgs 
    useEffect(() => {
      if(isEmpty(user)) {
        return;
      } else {
      if (userType == 'user') {
      console.log("username: " + user.username);
        const fetchPath = user.username;
        console.log('fetch path: ' + fetchPath);
        fetch(`http://localhost:5000/orgs/followed/${fetchPath}`)
        .then((resp) => resp.json())
        .then(({ data, err }) => {
        if (err) {
            console.log('Error getting orgs', err)
        } else {
            setFollowedOrgsList(data)
        }
        })
        .catch((err) => {
            console.log('Error getting orgs', err)
        })
      
      }}}
    , [user])


  return (
    <div>
      <Header />
      <h1>{user.username} Profile Page</h1>
      {console.log(user)}
      <p>Username: {user.username}</p>
      <p>Location: {user.locations && user.locations.map(l => {
        return <li>{l}</li>
      })}</p>
      <p>Interests: {user.interests && user.interests.map(i => {
        return <li>{i}</li>
      })}</p>
      {userType == 'user' ?
      <div>
      <h2>Organizations you follow:</h2>
      { followedOrgs !== undefined ?
                followedOrgs.map((org) => {
                            return <Org name={org.name}
                                description={org.description}
                                interests = {org.interests}
                                id = {org._id}
                                user = {user.username}
                            />;
                        }) : <p>No recommended orgs at this time</p>
            }
    <h2>Posts you like:</h2></div> : 
    <h2>Your Posts:</h2>
    }
    </div>
  )
}
