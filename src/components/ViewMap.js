import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import CreateRoute from "../pages/CreateRoute";
import JoinRoute from '../pages/JoinRoute'
import ViewMyRoute from "../pages/ViewMyRoute";

class ViewMap extends React.Component {

    
    render() {
        if(this.props.location.state.vehicleId) {
            this.viewRoute = <CreateRoute userData={this.props.location.state} />
        }else if(this.props.location.state.routeOrigin){
            this.viewRoute = <JoinRoute userData={this.props.location.state}/>
        }else{
            this.viewRoute = <ViewMyRoute routeData={this.props.location.state}/>
        }
        return (
            <div>
                <Wrapper
                apiKey={"AIzaSyC1KNLsoYyYT43GB4gT3znhFsTUBSOvS28"}
                libraries={["places"]}
                >
                    {this.viewRoute}
                </Wrapper>
            </div>
        );
    }
}

export default ViewMap;
