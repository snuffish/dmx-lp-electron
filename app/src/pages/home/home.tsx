import { Link } from "react-router-dom";
import React from "react"
import { Button } from "@material-ui/core";
import Test from "../../components/Test";

const Home = () => {
  return (
    <React.Fragment>
        <section className="section">
          <div className="container">
            <section className="hero is-info">
              <div className="hero-body">
                <p className="title">
                  DMX-LP-Controller Interface
                </p>
                <p className="subtitle">
                  Use Launchpad (MIDI) as a Controller to manage your DMX Lighting Fixtures.
                </p>
              </div>
            </section>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="title is-2">Menu</h2>
            <div>
              <Link to="/launchpad">Launchpad</Link><br/>
              {/* <Button variant="contained" color="primary">TEST</Button> */}
            </div>
          </div>
        </section>
      </React.Fragment>
  )
}

export default Home