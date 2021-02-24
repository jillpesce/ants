import Header from '../components/Header'

import Image from 'next/image'

export default function About() {
    return (
        <div className="about">
            <Header />
            <div className="page-body">
                <div className="section-header">
                    <h1>About Ants</h1>
                </div>
                <p className="text">
                    Ants is platform for nonprofits and activist organizations
                    to connect with community members and mobilize efforts.
                </p>
                <div className="section-header">
                    <h1>Mission</h1>
                </div>
                <p className="text">
                    Our ultimate goal is to provide one platform to create a
                    specific online space for volunteers and community members
                    to get more involved with nonprofits and activist
                    organizations. We want to help the organizations mobilize
                    their efforts and connect with interested people more
                    easily.
                </p>
                <div className="section-header">
                    <h1>Who we are</h1>
                </div>
                <div className="cards">
                    <div className="is-flex">
                        <div className="card">
                            <img
                                src={require('./img/Liv.jpeg')}
                                className="card-img-top"
                            ></img>
                            <div className="card-body">
                                <label className="label">Olivia O'Dwyer</label>
                                <p className="text">
                                    Liv has an ant farm at home. Each one has a
                                    name.
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img
                                src={require('./img/Eva.jpeg')}
                                className="card-img-top"
                            ></img>
                            <div className="card-body">
                                <label className="label">Eva Killenberg</label>
                                <p className="text">
                                    Eva is a million ants in the shape of a
                                    human.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="is-flex">
                        <div className="card">
                            <img
                                src={require('./img/Julie.jpeg')}
                                className="card-img-top"
                            ></img>
                            <div className="card-body">
                                <label className="label">Julie Chen</label>
                                <p className="text">
                                    Julie once stepped on an ant. We forgave
                                    her.{' '}
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img
                                src={require('./img/Jill.png')}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <label className="label">Jill Pesce</label>
                                <p className="text">
                                    Jill leaves crumbs out to attract more ants.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
