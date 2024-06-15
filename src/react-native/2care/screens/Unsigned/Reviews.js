import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import TopNav from '../../components/TopNav/TopNav';
import CardCaregiver from '../../components/Evaluation/CardCaregiver';
import ReviewStars from '../../components/Evaluation/ReviewStars';
import StarFilterOption from '../../components/Evaluation/StarFilterOption';
import CardEvaluation from '../../components/Evaluation/CardEvaluation';
import { createEvaluation } from '../../services/caregiverServiceMob'; // Importando a nova função

const Reviews = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const caregiver = route.params?.caregiver ?? {};
  // console.log(caregiver)
  const userType = localStorage.getItem('user_type'); // Obtendo o userType do localStorage

  const [selectedStars, setSelectedStars] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState(caregiver.evaluations || []);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedStars.length === 0) {
      setFilteredEvaluations(caregiver.evaluations || []);
    } else {
      setFilteredEvaluations(
        caregiver.evaluations.filter(evaluation => selectedStars.includes(evaluation.rating))
      );
    }
  }, [selectedStars, caregiver.evaluations]);

  const handleStarPress = (star) => {
    setSelectedStars(prevState =>
      prevState.includes(star) ? prevState.filter(s => s !== star) : [...prevState, star]
    );
  };

  const handleSubmitReview = async () => {
    try {
      const newEvaluation = {
        rating: newRating,
        description: newReview,
        caregiverId: caregiver._id
      };
      console.log(newEvaluation);
      await createEvaluation(newEvaluation);
      alert('Avaliação enviada com sucesso!');
      setError('');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error.message);
      setError(error.message);
    }
  };

  const averageRating = caregiver.evaluations.length 
    ? caregiver.evaluations.reduce((sum, ev) => sum + ev.rating, 0) / caregiver.evaluations.length 
    : 0;

  return (
    <ScrollView style={styles.container}>
    <TopNav navigation={navigation} />
      <CardCaregiver caregiver={caregiver} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: caregiver.picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s' }}
        />
        <Text>Média de Avaliações:</Text>
        <ReviewStars rating={averageRating} editable={false} />
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Filtre por:</Text>
          {[1, 2, 3, 4, 5].map((number) => (
            <StarFilterOption
              key={number}
              number={number}
              selected={selectedStars.includes(number)}
              onPress={() => handleStarPress(number)}
            />
          ))}
        </View>
        <View style={styles.evaluationsContainer}>
          {filteredEvaluations.length > 0 ? (
            filteredEvaluations.map((evaluation, index) => (
              <CardEvaluation key={index} evaluation={evaluation} />
            ))
          ) : (
            <Text style={styles.noEvaluationsText}>Nenhuma avaliação disponível.</Text>
          )}
        </View>
        {userType == 'CareReceiver' && (
          <View style={styles.newReviewContainer}>
            <Text style={styles.newReviewTitle}>Deixe sua avaliação</Text>
            <ReviewStars rating={newRating} onRatingChange={setNewRating} />
            <TextInput
              style={styles.newReviewInput}
              placeholder="Digite aqui..."
              value={newReview}
              onChangeText={setNewReview}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterText: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  evaluationsContainer: {
    marginVertical: 20,
  },
  noEvaluationsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  newReviewContainer: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  newReviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  newReviewInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#ed8733', // Cor do botão de envio harmonizada
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reviews;
