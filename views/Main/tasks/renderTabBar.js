import React from 'react';
import { TabBar } from 'react-native-tab-view';
import { Text } from 'native-base';

const renderTabBar = props => (
  <TabBar
  renderLabel={({ route }) => (
    <Text color='white' fontSize={12}>
        {route.title}
      </Text>
    )}
    indicatorStyle={{ backgroundColor: '#BB6BD9',height:'80%',margin:5,borderRadius:5,width:90 }}
    style={{ backgroundColor: '#293751', marginHorizontal:5,marginTop:15, borderRadius: 5, fontSize: 10,color:'#abafb5',position:'relative' }}
    {...props}
  />
);

export default renderTabBar;
