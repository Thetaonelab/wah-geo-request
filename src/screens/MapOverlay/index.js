/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-properties */
import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import styles from '../../styles/style';
import colors from '../../styles/color';

const { width, height } = Dimensions.get('window');

export default class MapOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const json = [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dadada'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#c9c9c9'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      }
    ];

    const points = [];
    const baseLat = 22.3;
    const baseLong = 88.3;
    for (let i = 0; i < 200; i++) {
      points.push({
        latitude:
          baseLat +
          (Math.pow(-1, parseInt(Math.random() * 100)) *
            Math.random() *
            Math.random()) /
            100,
        longitude:
          baseLong +
          (Math.pow(-1, parseInt(Math.random() * 100)) *
            Math.random() *
            Math.random() *
            1) /
            100,
        weight: Math.random() > 0.5 ? 1 : 0.8
      });
    }

    return (
      <MapView
        customMapStyle={json}
        provider={PROVIDER_GOOGLE}
        style={{ width, height }}
        initialRegion={{
          latitude: baseLat,
          longitude: baseLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
        <Heatmap
          points={points}
          gradient={{
            colors: ['red', 'yellow', 'green'],
            startPoints: [0.1, 0.6, 0.7]
          }}
        />
      </MapView>
    );
  }
}
