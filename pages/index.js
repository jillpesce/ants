import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Org from 'Components/Org'
import { use } from '../../ants-server/routes'

export default function Home() {
    const [orgs, setOrgsList] = useState([]);
    const { user, userType, logout } = useContext(UserContext)

    useEffect(() => {
        if (!user) window.location.assign('/login')
    })

    if (!user) return (<div/>)

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
            <h1>Home page</h1>
            <p> Welcome {userType}, {user.username} </p>
            <button onClick={logout}>Log out</button>

            <h2>Organizations to Follow:</h2>
            {orgs.map((org) => {
                            return <Org info={org}/>;
                        }) 
            }
        </div>
    )
}
