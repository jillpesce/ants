import Header from '../components/Header'

import Image from 'next/image'

export default function About() {
  return (
    <div>
      <Header />
      <h1>About Ants!</h1>
      <p>Ants is a social media platform for nonprofits and activist
        organizations to connect with community members and mobilize efforts.
</p>
      <h2>Mission</h2>
      <p>Our ultimate goal is to provide one platform to create a specific online space
         for volunteers and community members to get more involved with nonprofits and
         activist organizations. We want to help the organizations mobilize their efforts
         and connect with interested people more easily.</p>
      <h3>Who We Are</h3>
      <div className="card">
        <img src={require('./img/Liv.jpeg')} className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">Olivia O'Dwyer</h5>
          <p className="card-text">Liv has an ant farm at home. Each one has a name.  </p>
        </div>
        </div>
        <div className="card">
        <img src={require('./img/Eva.jpeg')}  className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">Eva Killenberg</h5>
          <p className="card-text">Eva is a million ants in the shape of a human.</p>
        </div>

      </div>

      <div className="card">
        <img src={require('./img/Julie.jpeg')}  className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">Julie Chen</h5>
          <p className="card-text">Julie once stepped on an ant. We forgave her.  </p>
        </div>
        </div>
        <div className="card">
        <img src={require('./img/Jill.png')}  className="card-img-top"/>
        <div className="card-body">
          <h5 className="card-title">Jill Pesce</h5>
          <p className="card-text">Jill leaves crumbs out to attract more ants.</p>
        </div>

      </div>
    </div>
  )
}
