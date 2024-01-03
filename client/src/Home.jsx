import React from 'react'
import requests from "./requests";
import Row from "./Row";
import Banner from "./Banner"


const Home = () => {
  return (
    <div>
      <Banner/>
      <Row  title="Netflix Originals"  isLargeRow fetchUrl={requests.requestPopular}/>
      <Row title="Trending Now" fetchUrl={requests.requestTrending}/>
      <Row title="Horror Movies" fetchUrl={requests.requestHorror}/>
      <Row title="Top Rated" fetchUrl={requests.requestTopRated}/>
      <Row title="Best for you" fetchUrl={requests.requestPopular}/>
      <Row title="Upcoming" fetchUrl={requests.requestUpcoming}/>
      <Row title="Comedy Movies" fetchUrl={requests.requestTrending}/>
    </div>
  )
}

export default Home