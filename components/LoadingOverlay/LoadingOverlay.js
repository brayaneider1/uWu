import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('screen');

class LoadingOverlay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={styles.loader}
            autoPlay
            loop
            source={require('../../assets/lotties/coin.json')} // Ruta a tu animación Lottie
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex:1000,
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  overlay: {
    flex:1,
    position: 'absolute',
    zIndex:1000,
    width: width,
    height:height,
    backgroundColor: 'rgba(1, 34, 68, 0.8)', // Opacidad del fondo
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 200, 
    height: 200, 
  },
});

export default LoadingOverlay;
