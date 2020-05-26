/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import CachedImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  image: { position: 'absolute', zIndex: -1 }
});

const FastImage = memo(
  ({
    renderPlaceholder,
    renderErrorImage,
    onError,
    onLoad,
    imageStyle,
    ...otherProps
  }) => {
    const [isLoading, setLoading] = useState(true);
    const [isErrored, setIsErrored] = useState(false);

    const CachedImageMemoized = useMemo(
      () => (
        <CachedImage
          {...otherProps}
          style={[imageStyle, styles.image]}
          onError={() => {
            setLoading(false);
            setIsErrored(true);
            if (onError) onError();
          }}
          onLoad={(e) => {
            setLoading(false);
            if (onLoad) onLoad(e);
          }}
        />
      ),
      [onError, onLoad, imageStyle, otherProps]
    );

    return (
      <View style={imageStyle}>
        {CachedImageMemoized}
        {isLoading && renderPlaceholder()}
        {isErrored && renderErrorImage()}
      </View>
    );
  }
);

FastImage.priority = CachedImage.priority;
FastImage.resizeMode = CachedImage.resizeMode;

FastImage.propTypes = {
  renderPlaceholder: PropTypes.func,
  renderErrorImage: PropTypes.func,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  imageStyle: PropTypes.object.isRequired
};

FastImage.defaultProps = {
  renderPlaceholder: () => null,
  renderErrorImage: () => null,
  onError: () => null,
  onLoad: () => null
};

export default FastImage;
