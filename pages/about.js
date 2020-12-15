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
        <img src={'./img/Liv.jpeg'} class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">Olivia O'Dwyer</h5>
          <p class="card-text">Liv is a current Senior and has a sweeeettt ass. </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        <div class="card">
        <img src='./img/Eva.jpeg' class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">Eva Killenberg</h5>
          <p class="card-text">Eva is a million ants in the shape of a human.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>

      </div>

      <div class="card">
        <img src="./img/Julie.jpeg" class="card-img-top"></img>
        <div class="card-body">
          <h5 class="card-title">Julie Chen</h5>
          <p class="card-text">Julie once walked into a door and got a concussion. She 
          has not since recovered. </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        <div class="card">
        <img src='./img/Jill.jpg' class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Jill Pesce</h5>
          <p class="card-text">Jill niver learnt how to spel, but we luv hur anyway.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>

      </div>
    </div>
  )
}
