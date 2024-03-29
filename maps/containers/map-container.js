import React from 'react';
import { View } from 'react-native';
import MapInput from '../components/map-input';
import MyMapView from '../components/map-view';
import { getLocation } from '../services/location-service';

class MapContainer extends React.Component {
  state = {
    region: {},
  };

  componentDidMount() {
    this.getInitialState();
  }

  getInitialState() {
    getLocation().then(data => {
      this.updateState({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
  }

  updateState(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  }

  getCoordsFromName(loc) {
    this.updateState({
      latitude: loc.lat,
      longitude: loc.lng,
    });
  }
 
  onMapRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.15 }}>
          <MapInput style={{zIndex:1.5}} notifyChange={loc => this.getCoordsFromName(loc)} />
        </View>
        {this.state.region['latitude'] ? (
          <View style={{ flex: 1, zIndex:0 }}>
            <MyMapView style={{zIndex:-10}}
              region={this.state.region}
              onRegionChange={reg => this.onMapRegionChange(reg)}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default MapContainer;
