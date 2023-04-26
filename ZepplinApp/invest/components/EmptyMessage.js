import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';

const App = ({title, subTitle}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
      <Text style={{textAlign: 'center', fontSize: 16,}}>
        {title}
      </Text>
      {subTitle ? (
        <Text style={{textAlign: 'center', fontSize: 14,}}>
          {subTitle}
        </Text>
      ) : null}
    </View>
  );
};

export default App;
