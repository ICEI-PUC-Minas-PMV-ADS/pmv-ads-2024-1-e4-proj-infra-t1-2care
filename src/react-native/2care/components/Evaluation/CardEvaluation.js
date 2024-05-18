// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// const CardEvaluation = ({ clienteName }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContent}>
//         <View style={styles.clientNameContainer}>
//           <MaterialIcons name="person" size={20} color="#486142" />
//           <Text style={styles.clientName}>{clienteName}</Text>
//         </View>
//         <View style={styles.starsContainer}>
//           {[1, 2, 3, 4, 5].map((number) => (
//             <MaterialIcons
//               key={number}
//               name="star"
//               size={20}
//               color={number <= 3 ? "#ED8733CC" : "#E0E0E0"}
//               style={styles.star}
//             />
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderWidth: 1,
//     borderColor: '#799275',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   leftContent: {
//     flexDirection: 'column',
//   },
//   clientNameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   clientName: {
//     marginLeft: 5,
//     color: '#486142',
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   star: {
//     marginRight: 2,
//   },
// });

// export default CardEvaluation;
