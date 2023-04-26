import React, { useRef, useEffect, Component, Children } from "react";
import { VStack, Text, Flex } from "native-base";
import { AuthContext } from "../FirebaseProvider";
import ConfettiCannon from 'react-native-confetti-cannon';
import { StyleSheet, View, Animated, TouchableWithoutFeedback } from "react-native";

class TextPop extends Component {
  state = {
    animation: new Animated.Value(1)
  };
  
  componentDidMount() {
    // this.state.animation.addListener(({ value }) => {
    //   console.log(value);
    // })
    Animated.spring(this.state.animation, {
      toValue: 1.4,
      friction: 2,
      tension: 10,
      duration: 1300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });
  }

  render() {
    const animatedStyle = {
      transform: [
        { scale: this.state.animation}
      ]
    }

    return (
      // <View style={styles.container}>
          <Animated.View style={[styles.box, animatedStyle]}>
            {this.props.children}
          </Animated.View>
      // </View>
    );

  }
}


const OrderSuccess = ({ navigation, route }) => {
  const cannon = useRef(null);

  const {
    symbol,
    side
  } = route.params;

  // const symbol=  'PYPL';
  // const side = 'buy';

  useEffect(() => {
    setTimeout(() => {
        navigation.goBack();
    }, 5000)
  }, []);

  return (
    <>
      <VStack safeArea={true} flex="1">
        <Flex flex="1" direction='column' justifyContent={'center'} alignItems='center'>
            <TextPop>
              <View>
              <Text style={{fontSize: 20,  textAlign: 'center', lineHeight: 40,}}>
                Congratulations on your {side === 'buy' ? 'purchase' : 'sale'} of {symbol.toUpperCase()}
            </Text>
              </View>
            
              </TextPop>
            
        </Flex>
        
        <ConfettiCannon
          count={200}
          origin={{x: 0, y: -10}}
          colors={["#169509"]}
          autoStart={true}
          ref={cannon}
        />
      </VStack>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 200,
    // height: 50,
    // backgroundColor: "tomato",
  }
});

export default OrderSuccess;
