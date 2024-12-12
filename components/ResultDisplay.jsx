import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ResultDisplay = ({ parsedResult }) => {
  if (!parsedResult) return null;

  if (parsedResult.error) {
    return <Text style={styles.errorText}>{parsedResult.error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Reasoning Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reasoning</Text>
        <Text style={styles.sectionContent}>{parsedResult.reasoning}</Text>
      </View>

      {/* Ingredients Section */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <FlatList
          data={parsedResult.ingredients}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.ingredientCard}>
              <Text style={styles.ingredientName}>{item.ingredient}</Text>
              <Text style={item.is_safe === "true" ? styles.safeText : styles.unsafeText}>
                {item.is_safe === "true" ? "Safe" : "Not Safe"}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.sectionContent}>No ingredients found.</Text>
          )}
        />
      </View> */}

      {/* Third-Party Certification Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Third-Party Certification</Text>
        <Text style={parsedResult.third_party_certified === "true" ? styles.safeText : styles.unsafeText}>
          {parsedResult.third_party_certified === "true" ? "Certified" : "Not Certified"}
        </Text>
      </View>

      {/* Feedback Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feedback</Text>
        <Text style={styles.feedbackText}>{parsedResult.feedback}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#161622',
    borderRadius: 10,
    margin: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA001',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#CDCDE0',
    lineHeight: 20,
  },
  ingredientCard: {
    backgroundColor: '#222233',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  ingredientName: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  safeText: {
    color: '#32CD32',
    fontWeight: 'bold',
    marginTop: 5,
  },
  unsafeText: {
    color: '#FF4500',
    fontWeight: 'bold',
    marginTop: 5,
  },
  feedbackText: {
    fontSize: 14,
    color: '#00BFFF',
    marginTop: 8,
    lineHeight: 22,
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ResultDisplay;
