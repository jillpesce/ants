import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/user-context'
import isEmpty from 'lodash/isEmpty'
import Header from '../components/Header'
import Org from '../components/Org'
import interestsList from '../constants/interests'
import locationsList from '../constants/locations'

export default function Search() {
    const { user, userType } = useContext(UserContext)
    const [allOrgs, setAllOrgs] = useState([])
    const [displayOrgs, setDisplayOrgs] = useState([])
    const [query, setQuery] = useState('')
    const [locations, setLocations] = useState([])
    const [interests, setInterests] = useState([])
    const [dropdown, setDropdown] = useState()

    useEffect(() => {
        if (!user) window.location.assign('/login')
        else if (userType === 'org') window.location.assign('/org')
    }, [user])

    // get orgs
    useEffect(() => {
        fetch(`https://ants-senior-design.herokuapp.com/orgs`)
            .then((resp) => resp.json())
            .then(({ data, err }) => {
                if (err) {
                    console.log('Error getting orgs', err)
                } else {
                    setAllOrgs(data || [])
                    setDisplayOrgs(data || [])
                }
            })
            .catch((err) => {
                console.log('Error getting orgs', err)
            })
    }, [])

    // filter orgs
    useEffect(() => {
        if (!query && !interests.length && !locations.length)
            setDisplayOrgs(allOrgs)
        else
            setDisplayOrgs(
                allOrgs.filter((org) => {
                    return (
                        org.name.toLowerCase().indexOf(query.toLowerCase()) !==
                            -1 &&
                        (interests.length
                            ? interests.some((i) => org.interests.includes(i))
                            : true) &&
                        (locations.length
                            ? locations.some((l) => org.locations.includes(l))
                            : true)
                    )
                })
            )
    }, [query, locations, interests])

    return (
        <div>
            <Header />
            <div className="page-body">
                <div className="section-header">
                    <h1>Search Organizations</h1>
                    <h2>Discover new organizations</h2>
                </div>
                <div className="search-bar">
                    <div className="field">
                        <label className="label">Search by name</label>
                        <input
                            className="input"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Filter by location</label>
                        <div
                            className={
                                dropdown === 'location'
                                    ? 'dropdown is-active'
                                    : 'dropdown'
                            }
                        >
                            <div className="dropdown-trigger">
                                <button
                                    className="button"
                                    onClick={() =>
                                        setDropdown(
                                            dropdown ? undefined : 'location'
                                        )
                                    }
                                >
                                    <em>Locations</em>
                                </button>
                            </div>
                            <div
                                className="dropdown-menu"
                                id="dropdown-menu"
                                role="menu"
                            >
                                <div className="dropdown-content">
                                    {locationsList.map((l) => (
                                        <a
                                            className="dropdown-item"
                                            onClick={() => {
                                                if (!locations.includes(l))
                                                    setLocations([
                                                        ...locations,
                                                        l,
                                                    ])
                                                setDropdown(undefined)
                                            }}
                                        >
                                            {l === 'DC' || l === 'NYC'
                                                ? l
                                                : l.toLowerCase()}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Filter by interest</label>
                        <div
                            className={
                                dropdown === 'interest'
                                    ? 'dropdown is-active'
                                    : 'dropdown'
                            }
                        >
                            <div className="dropdown-trigger">
                                <button
                                    className="button"
                                    onClick={() =>
                                        setDropdown(
                                            dropdown ? undefined : 'interest'
                                        )
                                    }
                                >
                                    <em>Interests</em>
                                </button>
                            </div>
                            <div
                                className="dropdown-menu"
                                id="dropdown-menu"
                                role="menu"
                            >
                                <div className="dropdown-content">
                                    {interestsList.map((i) => (
                                        <a
                                            className="dropdown-item"
                                            onClick={() => {
                                                if (!interests.includes(i))
                                                    setInterests([
                                                        ...interests,
                                                        i,
                                                    ])
                                                setDropdown(undefined)
                                            }}
                                        >
                                            {i === 'LGBTQ'
                                                ? i
                                                : i.toLowerCase()}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tags-container">
                    {locations.map((l) => (
                        <span className="tag">
                            <p className="tag-label">Location</p>
                            <div>
                                {l === 'DC' || l === 'NYC'
                                    ? l
                                    : l.toLowerCase()}
                                <button
                                    class="delete"
                                    onClick={() =>
                                        setLocations(
                                            locations.filter((loc) => loc !== l)
                                        )
                                    }
                                ></button>
                            </div>
                        </span>
                    ))}
                    {interests.map((i) => (
                        <span className="tag">
                            <p className="tag-label">Interest</p>
                            <div>
                                {i === 'LGBTQ' ? i : i.toLowerCase()}
                                <button
                                    className="delete"
                                    onClick={() =>
                                        setInterests(
                                            interests.filter((int) => int !== i)
                                        )
                                    }
                                ></button>
                            </div>
                        </span>
                    ))}
                </div>
                <div className="orgs">
                    {displayOrgs.map((o) => (
                        <Org org={o} />
                    ))}
                </div>
            </div>
        </div>
    )
}
