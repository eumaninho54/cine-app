import React, { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"
import { ThemeContext } from 'styled-components';
import { themeModel } from '../../models/themeModel';
import { Badge, withBadge } from 'react-native-elements'
import { TicketContext } from '../../context/ticketContext';
import { ticketContextProps } from '../../models/ticketModel';


const IconTicketHeader: React.FC = () => {
  const themeContext = useContext<themeModel>(ThemeContext)
  const { ticketsToBuy } = useContext<ticketContextProps>(TicketContext)

  return (
    <TouchableOpacity style={{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome
        name="ticket"
        size={28}
        color={"#303030"}
      />

      <Badge
        value={ticketsToBuy.length}
        badgeStyle={{
          display: ticketsToBuy.length == 0 ? "none" : "flex",
          backgroundColor: "#303030",
          borderColor: "#303030"
        }}
        containerStyle={{ position: "absolute", top: 3, left: 4 }} />
    </TouchableOpacity>
  )
}

export default IconTicketHeader;