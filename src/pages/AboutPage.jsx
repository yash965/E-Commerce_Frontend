import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          It all began with a simple belief: in a world of endless scrolling, the magic of a real book still holds a 
          special power. Bookstore was born in 2025 from a lifelong passion for stories and a dream to create a 
          sanctuary for readers right here.
          We wanted to build more than just a place to buy books. We envisioned a community hub—a warm, inviting 
          space where you can get lost in the aisles, discover a new author, and share your literary adventures with 
          fellow book lovers. We believe that every book on our shelves has the potential to inspire, challenge, and 
          transport you. Our journey is about connecting the right book with the right person at the right time.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://m.media-amazon.com/images/I/81j4C6j3dRL._SY466_.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Fantacy Books</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://m.media-amazon.com/images/I/413tVFk--xS._SY445_SX342_ControlCacheEqualizer_.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Self-Help Books</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://m.media-amazon.com/images/I/71fSQq9M+vL._SY466_.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Thriller Books</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471183348/the-book-of-mysteries-9781471183348_lg.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Mystry Books</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage