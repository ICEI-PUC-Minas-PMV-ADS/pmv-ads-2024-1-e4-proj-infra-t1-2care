import React, { useState, useRef } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import TopNavOptions from "../../components/TopNav/TopNavOptions";
import Pending from "../../components/ProposalCard/Pending";
import Accepted from "../../components/ProposalCard/Accepted";
import Rejected from "../../components/ProposalCard/Rejected";

export default function Requests({ userType }) {
  const [selectedOption, setSelectedOption] = useState('Pendentes');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  let selectedComponent;
  switch (selectedOption) {
    case 'Pendentes':
      selectedComponent = <Pending />;
      break;
    case 'Aceitas':
      selectedComponent = <Accepted />;
      break;
    case 'Recusadas':
      selectedComponent = <Rejected />;
      break;
    default:
      selectedComponent = <Pending />;
  }

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(yOffset > 0);
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <TopNavOptions onSelect={setSelectedOption} selectedOption={selectedOption} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
          <View style={styles.cardContainer}>{selectedComponent}</View>
        </View>
      </ScrollView>
      {showScrollToTop && (
        <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
          <Ionicons name="chevron-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
