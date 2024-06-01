import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopNav from "../../components/TopNav/TopNav";
import CarereceiverFormProposal from "../../components/Modal/CarereceiverFormProposal";

export default function SendRequest() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TopNav navigation={navigation} />
      <View style={styles.content}>
        <Pressable onPress={openModal}>
        <Text style={[styles.openModalButton, styles.customButton]}>Modal de enviar proposta</Text>
        </Pressable>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CarereceiverFormProposal />
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openModalButton: {
    fontSize: 20,
    color: "#007AFF",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  customButton: {
    backgroundColor: "#ED8733",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
  },  
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#B65138",
  },
});
