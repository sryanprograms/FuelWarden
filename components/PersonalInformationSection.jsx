import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";

const theme = {
  colors: { text: "white", placeholder: "gray", primary: "#FFA001" },
};

const PersonalInformationSection = ({ initialData, onSave }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [heightFeet, setHeightFeet] = useState(initialData?.heightFeet || "");
  const [heightInches, setHeightInches] = useState(initialData?.heightInches || "");
  const [weight, setWeight] = useState(initialData?.weight || "");

  const validateNumericInput = (value) => /^[0-9]*$/.test(value);

  const handleSave = () => {
    if (
      name &&
      age &&
      gender &&
      validateNumericInput(heightFeet) &&
      validateNumericInput(heightInches) &&
      weight
    ) {
      onSave({
        name,
        age,
        gender,
        heightFeet,
        heightInches,
        weight,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Name Input */}
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          mode="outlined"
          style={styles.input}
          theme={theme}
        />
        <HelperText type="error" visible={!name} style={styles.errorText}>
          Name is required.
        </HelperText>

        {/* Age Input */}
        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          theme={theme}
        />
        <HelperText type="error" visible={!age} style={styles.errorText}>
          Age is required.
        </HelperText>

        {/* Gender Selection */}
        <View style={styles.genderSection}>
          <Text style={styles.label}>Select Gender:</Text>
          <View style={styles.genderRow}>
            <Button
              mode={gender === "Male" ? "contained" : "outlined"}
              onPress={() => setGender("Male")}
              style={[
                styles.genderButton,
                gender === "Male" && styles.activeGenderButton,
              ]}
              labelStyle={
                gender === "Male" ? styles.activeLabel : styles.inactiveLabel
              }
            >
              Male
            </Button>
            <Button
              mode={gender === "Female" ? "contained" : "outlined"}
              onPress={() => setGender("Female")}
              style={[
                styles.genderButton,
                gender === "Female" && styles.activeGenderButton,
              ]}
              labelStyle={
                gender === "Female" ? styles.activeLabel : styles.inactiveLabel
              }
            >
              Female
            </Button>
          </View>
          <Button
            mode={gender === "Non-Binary/Other" ? "contained" : "outlined"}
            onPress={() => setGender("Non-Binary/Other")}
            style={[
              styles.genderButton,
              gender === "Non-Binary/Other" && styles.activeGenderButton,
            ]}
            labelStyle={
              gender === "Non-Binary/Other"
                ? styles.activeLabel
                : styles.inactiveLabel
            }
          >
            Non-Binary/Other
          </Button>
        </View>
        <HelperText type="error" visible={!gender} style={styles.errorText}>
          Gender is required.
        </HelperText>

        {/* Height Input */}
        <View style={styles.heightGroup}>
          <TextInput
            label="Height (feet)"
            value={heightFeet}
            onChangeText={setHeightFeet}
            placeholder="Feet"
            mode="outlined"
            keyboardType="numeric"
            style={styles.halfInput}
            theme={theme}
          />
          <TextInput
            label="Height (inches)"
            value={heightInches}
            onChangeText={setHeightInches}
            placeholder="Inches"
            mode="outlined"
            keyboardType="numeric"
            style={styles.halfInput}
            theme={theme}
          />
        </View>
        <HelperText
          type="error"
          visible={!validateNumericInput(heightFeet) || !validateNumericInput(heightInches)}
          style={styles.errorText}
        >
          Valid height in feet and inches is required.
        </HelperText>

        {/* Weight Input */}
        <TextInput
          label="Weight (lbs)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          theme={theme}
        />
        <HelperText type="error" visible={!weight} style={styles.errorText}>
          Weight is required.
        </HelperText>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
          labelStyle={styles.saveButtonLabel}
          disabled={
            !name ||
            !age ||
            !gender ||
            !validateNumericInput(heightFeet) ||
            !validateNumericInput(heightInches) ||
            !weight
          }
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFA001",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e1e1e",
    marginBottom: 10,
  },
  errorText: {
    color: "#FFA001",
  },
  label: {
    color: "#FFFFFF",
    marginBottom: 10,
  },
  genderSection: {
    marginBottom: 10,
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  genderButton: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: "#FFA001",
  },
  activeGenderButton: {
    backgroundColor: "#FFA001",
  },
  activeLabel: {
    color: "#1e1e1e",
  },
  inactiveLabel: {
    color: "#FFFFFF",
  },
  heightGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    margin: 5,
  },
  saveButton: {
    backgroundColor: "#FFA001",
    marginTop: 20,
    padding: 10,
  },
  saveButtonLabel: {
    color: "#1e1e1e",
    fontWeight: "bold",
  },
});

export default PersonalInformationSection;
