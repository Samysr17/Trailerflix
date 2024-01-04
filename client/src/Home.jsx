import React from 'react'
import requests from "./requests";
import Row from "./Row";
import Banner from "./Banner"


const Home = () => {
  return (
    <div>
      <Banner/>
      <Row rowId='1'  title="Netflix Originals"  isLargeRow fetchUrl={requests.requestPopular}/>
      <Row rowId='2'  title="Trending Now" fetchUrl={requests.requestTrending}/>
      <Row rowId='3'  title="Horror Movies" fetchUrl={requests.requestHorror}/>
      <Row rowId='4'  title="Top Rated" fetchUrl={requests.requestTopRated}/>
      <Row rowId='5'  title="Best for you" fetchUrl={requests.requestPopular}/>
      <Row rowId='6'  title="Upcoming" fetchUrl={requests.requestUpcoming}/>
      <Row rowId='7' title="Comedy Movies" fetchUrl={requests.requestTrending}/>
    </div>
  )
}

export default Home