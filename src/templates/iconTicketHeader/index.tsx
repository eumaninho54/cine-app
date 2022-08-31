import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"
import { Badge } from 'react-native-elements'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatesModel } from '../../models/storeModel';
import { useSelector } from 'react-redux';


const IconTicketHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const toBuyTickets = useSelector((state: StatesModel) => state.toBuyTickets)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Purchase', {})}
      style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome
        name="ticket"
        size={28}
        color={"#303030"}
      />

      <Badge
        value={toBuyTickets.length}
        badgeStyle={{
          display: toBuyTickets.length == 0 ? "none" : "flex",
          backgroundColor: "#303030",
          borderColor: "#303030"
        }}
        containerStyle={{ position: "absolute", top: 3, left: 4 }} />
    </TouchableOpacity>
  )
}

export default IconTicketHeader;