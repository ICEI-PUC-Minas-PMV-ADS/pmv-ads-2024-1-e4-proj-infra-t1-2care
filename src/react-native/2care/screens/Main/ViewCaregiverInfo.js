import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import "../AppMobile.css";
import { useAuth } from '../../contexts/AuthContext';

import SendRequest from "../../screens/Main/SendRequest"

const GENDER_MAP = {
    0: "",
    1: "Masculino",
    2: "Feminino",
    3: "Outro",
};

const DAY_MAP = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado",
};

export default function ViewCaregiverInfo({ route }) {
    const navigation = useNavigation();
    const caregiver = route.params?.caregiver ?? null;
    const [caregiverData, setCaregiverData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setCaregiverData(caregiver);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAgendaPress = () => {
        navigation.navigate("AgendaMob", {caregiver: route.params?.caregiver ?? null});
    };

    const handleReviews = () => {
        console.log(caregiverData)
        navigation.navigate('Reviews', { caregiver: caregiverData });
      };
      
      

    const handleSendRequest = () => { 
        setModalVisible(true);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>
                    <Text style={styles.name}>{caregiverData.name}</Text>
                    <Text style={styles.role}>Cuidador</Text>

                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: caregiverData.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s" }}
                        />
                    </View>

                    <View style={styles.buttonsProfile}>
                        <Pressable onPress={handleReviews} style={styles.button}>
                            <Text style={styles.buttonText}>Avaliações</Text>
                        </Pressable>
                        <Pressable onPress={handleAgendaPress} style={styles.button}>
                            <Text style={styles.buttonText}>Agenda</Text>
                        </Pressable>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="at" size={20} style={styles.icon} />
                            <Text style={styles.label}>E-MAIL</Text>
                        </View>
                        <Text style={styles.info}>{caregiverData.email}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="phone" size={20} style={styles.icon} />
                            <Text style={styles.label}>TELEFONE</Text>
                        </View>
                        <Text style={styles.info}>{caregiverData.phone}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon
                                name="circle"
                                size={20}
                                style={[styles.icon, { color: "#486142" }]}
                            />
                            <Text style={styles.label}>GÊNERO</Text>
                        </View>
                        <Text style={styles.info}>{GENDER_MAP[caregiverData.gender]}</Text>
                    </View>

                    <View style={styles.section}>
                        <Icon name="graduation-cap" size={20} style={styles.icon} />
                        <Text style={styles.label}>QUALIFICAÇÕES</Text>
                    </View>
                    {caregiverData.qualifications && caregiverData.qualifications.length > 0 ? (
                        caregiverData.qualifications.map((qualification, index) => (
                            <View style={styles.qualifications} key={index} >
                                <View style={styles.info}>
                                    <Text>{qualification.name}</Text>
                                    <Text>{qualification.conclusion_date}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.info}>Não informado.</Text>
                    )}

                    <View style={styles.section}>
                        <Icon name="briefcase" size={20} style={styles.icon} />
                        <Text style={styles.label}>ESPECIALIZAÇÕES</Text>
                    </View>

                    <View>
                        {caregiverData.specializations && caregiverData.specializations.length > 0 ? (
                            caregiverData.specializations.map((specialization, index) => (
                                <Text style={styles.info} key={index}>• {specialization}</Text>
                            ))
                        ) : (
                            <Text style={styles.info}>Não informado.</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Icon name="book" size={20} style={styles.icon} />
                        <Text style={styles.label}>EXPERIÊNCIAS DE TRABALHO</Text>
                    </View>
                    {caregiverData.work_exp && caregiverData.work_exp.length > 0 ? (
                        caregiverData.work_exp.map((exp, index) => (
                            <View key={index} style={styles.experiences}>
                                <View style={styles.info}>
                                    <Text>{exp.place}</Text>
                                    <Text>{exp.start_date} - {exp.end_date}</Text>
                                    <Text>{exp.description}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.info}>Não informado.</Text>
                    )}

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.years}>{caregiverData.career_time}</Text>
                            <Text style={styles.label}>  ANOS DE EXPERIÊNCIA</Text>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="dollar" size={20} style={styles.icon} />
                            <Text style={styles.label}>PREÇO POR DIA</Text>
                        </View>
                    </View>
                    <View style={styles.pricing}>
                        <Text>{caregiverData.day_price ? "R$ " + caregiverData.day_price + ",00" : ""}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="dollar" size={20} style={styles.icon} />
                            <Text style={styles.label}>PREÇO POR HORA</Text>
                        </View>
                    </View>
                    <View style={styles.pricing}>
                        <Text>{caregiverData.hour_price ? "R$ " + caregiverData.hour_price + ",00" : ""}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="info-circle" size={20} style={styles.icon} />
                            <Text style={styles.label}>INFORMAÇÕES ADICIONAIS</Text>
                        </View>
                    </View>
                    <View style={styles.additionalInfo}>
                        {caregiverData.additional_info ? <Text> {caregiverData.additional_info}</Text> : <Text>Não informado.</Text>}
                    </View>
                </View>
            </ScrollView>

            { user &&
                <View style={styles.sendRequestButtonContainer}>
                    <Pressable onPress={handleSendRequest} style={styles.sendRequestButton}>
                        <Text style={styles.buttonText}>Enviar proposta</Text>
                    </Pressable>
                </View>
            }
            <SendRequest
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            caregiver={caregiverData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        width: "80%",
        margin: "auto",
        marginBottom: "5%",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    role: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
        color: "#ED8733",
    },
    imageContainer: {
        alignItems: "center",
    },
    profileImage: {
        width: 170,
        height: 170,
        borderRadius: 100,
    },
    editIcon: {
        position: "absolute",
        right: "30%",
        bottom: 0,
        backgroundColor: "#ED8733",
        borderRadius: 10,
        padding: 5,
    },
    buttonsProfile: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    button: {
        backgroundColor: "#486142",
        padding: 10,
        borderRadius: 25,
        alignItems: "center",
        width: 130,
        marginBottom: 20,
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
    },
    infoContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
        color: "#486142",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 0,
        color: "#486142",
    },
    info: {
        fontSize: 16,
        marginLeft: 30,
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    qualifications: {
        borderWidth: 1,
        borderColor: "#486142",
        padding: 8,
        borderRadius: 5,
        marginVertical: 2,
    },
    experiences: {
        borderWidth: 1,
        borderColor: "#486142",
        padding: 8,
        borderRadius: 5,
        marginVertical: 2,
    },
    experienceCard: {
        borderWidth: 1,
        borderColor: "#486142",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    years: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#486142",
    },
    fixedDays: {
        paddingLeft: 30,
        marginBottom: 5,
    },
    fixedHours: {
        paddingLeft: 30,
        marginBottom: 5,
    },
    pricing: {
        paddingLeft: 30,
        marginBottom: 5,
    },
    additionalInfo: {
        paddingLeft: 30,
        marginBottom: 5,
    },
    sendRequestButtonContainer: {
        backgroundColor: "rgba(210, 218, 195, 0.5)",
        alignItems: "center",
    },
    sendRequestButton: {
        backgroundColor: "#ED8733",
        marginVertical: 10,
        padding: 10,
        borderRadius: 25,
        alignItems: "center",
        width: 130,
        marginBottom: 20,
        justifyContent: "center",
    },
});