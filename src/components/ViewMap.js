import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import CreateRoute from "../pages/CreateRoute";

class ViewMap extends React.Component {

  render() {
    return (
        <div>
            <Wrapper
                apiKey={"AIzaSyC1KNLsoYyYT43GB4gT3znhFsTUBSOvS28"}
                libraries={[
                'places'
                ]}
                >
                <CreateRoute userData={this.props.location.state}/>
            </Wrapper>
        </div>
      
    );
  }
}

export default ViewMap