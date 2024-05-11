import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TopNavOptions from "../../components/TopNav/TopNavOptions";
import Pending from "../../components/ProposalCard/Pending";
export default function RequestsCaregiver(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TopNavOptions navigation={navigation} />
            <View style={styles.content}>
                <Pending />
                <Pending />
                <Pending />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
