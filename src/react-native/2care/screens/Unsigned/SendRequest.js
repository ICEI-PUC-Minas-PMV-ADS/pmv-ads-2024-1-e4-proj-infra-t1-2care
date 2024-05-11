import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TopNav from "../../components/TopNav/TopNav";

export default function SendRequest(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TopNav navigation={navigation}/>
            <View style={styles.content}>
                <Text>Criação das telas</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Cor de fundo da tela
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
