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
      <div class="card">
        <img src={require('./img/Liv.jpeg')} class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">Olivia O'Dwyer</h5>
          <p class="card-text">Liv has an ant farm at home. Each one has a name.  </p>
        </div>
        </div>
        <div class="card">
        <img src={require('./img/Eva.jpeg')}  class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">Eva Killenberg</h5>
          <p class="card-text">Eva is a million ants in the shape of a human.</p>
        </div>

      </div>

      <div class="card">
        <img src={require('./img/Julie.jpeg')}  class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">Julie Chen</h5>
          <p class="card-text">Julie once stepped on an ant. We forgave her.  </p>
        </div>
        </div>
        <div class="card">
        <img src={require('./img/Jill.png')}  class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Jill Pesce</h5>
          <p class="card-text">Jill leaves crumbs out to attract more ants.</p>
        </div>

      </div>
    </div>
  )
}
