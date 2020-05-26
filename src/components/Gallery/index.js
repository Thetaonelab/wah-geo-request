/* eslint-disable prefer-spread */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from './FastImage';
import styles from './style';
import colors from '../../styles/color';
import text from '../../styles/text';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageuri: '',
      ModalVisibleStatus: false
    };
  }

  componentDidMount() {
    /* const that = this;
    const items = Array.apply(null, Array(120)).map((v, i) => ({
      id: i,
      src: `https://unsplash.it/400/400?image=${i + 1}`
    }));
    that.setState({
      dataSource: items
    }); */
  }

  ShowModalFunction(visible, imageURL) {
    // handler to handle the click on image of Grid
    // and close button on modal
    this.setState({
      ModalVisibleStatus: visible,
      imageuri: imageURL
    });
  }

  render() {
    if (this.state.ModalVisibleStatus) {
      return (
        <Modal
          transparent={false}
          animationType="fade"
          visible={this.state.ModalVisibleStatus}
          onRequestClose={() => {
            this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
          }}>
          <View style={styles.modelStyle}>
            <FastImage
              style={styles.fullImageStyle}
              source={{ uri: this.state.imageuri }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.closeButtonStyle}
              onPress={() => {
                this.ShowModalFunction(!this.state.ModalVisibleStatus, '');
              }}>
              <Text style={{ color: 'white', fontWeight: '700' }}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
    return this.props.imagesLoading ? (
      <View
        style={[
          styles.parentContainer,
          { padding: 10, justifyContent: 'flex-start', alignItems: 'center' }
        ]}>
        <ActivityIndicator color={colors.colorsecondary10} size={30} />
      </View>
    ) : (
      <FlatList
        data={this.props.images.map((v, i) => ({
          id: i,
          src: v
        }))}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <TouchableOpacity
              key={item.id}
              style={{ flex: 1 }}
              onPress={() => {
                this.ShowModalFunction(true, item.src);
              }}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.src
                }}
                imageStyle={styles.image}
                renderPlaceholder={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <ActivityIndicator
                      color={colors.colorsecondary22}
                      size={20}
                    />
                    <Text style={[text.bodyText, { fontStyle: 'italic' }]}>
                      Loading image ...{' '}
                    </Text>
                  </View>
                )}
              />
            </TouchableOpacity>
          </View>
        )}
        // Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imagesLoading: PropTypes.bool.isRequired
};
