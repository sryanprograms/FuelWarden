import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";

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

  const theme = {
    colors: { text: "white", placeholder: "gray", primary: "#FFA001" },
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <View className="bg-gray-900 p-5 rounded-lg space-y-4">
        <Text
          variant="titleLarge"
          className="text-secondary text-center font-semibold mb-3 mt-4"
        >
          Personal Information
        </Text>

        {/* Name Input */}
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          mode="outlined"
          className="bg-gray-800"
          theme={theme}
        />
        <HelperText type="error" visible={!name} style={{ color: "#FFA001" }}>
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
          className="bg-gray-800"
          theme={theme}
        />
        <HelperText type="error" visible={!age} style={{ color: "#FFA001" }}>
          Age is required.
        </HelperText>

        {/* Gender Selection */}
        <View className="space-y-2">
          <Text className="text-gray-400 font-bold">Select Gender:</Text>
          <View className="flex-row justify-between">
            <Button
              mode={gender === "Male" ? "contained" : "outlined"}
              onPress={() => setGender("Male")}
              className={`${
                gender === "Male" ? "bg-secondary" : "bg-gray-800"
              } flex-1 mx-1`}
              labelStyle={{ color: gender === "Male" ? "black" : "white" }}
            >
              Male
            </Button>
            <Button
              mode={gender === "Female" ? "contained" : "outlined"}
              onPress={() => setGender("Female")}
              className={`${
                gender === "Female" ? "bg-secondary" : "bg-gray-800"
              } flex-1 mx-1`}
              labelStyle={{ color: gender === "Female" ? "black" : "white" }}
            >
              Female
            </Button>
          </View>
          <Button
            mode={gender === "Non-Binary/Other" ? "contained" : "outlined"}
            onPress={() => setGender("Non-Binary/Other")}
            className={`${
              gender === "Non-Binary/Other" ? "bg-secondary" : "bg-gray-800"
            } mt-1`}
            labelStyle={{
              color: gender === "Non-Binary/Other" ? "black" : "white",
            }}
          >
            Non-Binary/Other
          </Button>
        </View>
        <HelperText type="error" visible={!gender} style={{ color: "#FFA001" }}>
          Gender is required.
        </HelperText>

        {/* Height Input */}
        <View>
          <TextInput
            label="Height (feet)"
            value={heightFeet}
            onChangeText={setHeightFeet}
            placeholder="Feet"
            mode="outlined"
            keyboardType="numeric"
            className="bg-gray-800"
            theme={theme}
          />
          <TextInput
            label="Height (inches)"
            value={heightInches}
            onChangeText={setHeightInches}
            placeholder="Inches"
            mode="outlined"
            keyboardType="numeric"
            className="bg-gray-800"
            theme={theme}
          />
        </View>
        <HelperText
          type="error"
          visible={!validateNumericInput(heightFeet) || !validateNumericInput(heightInches)}
          style={{ color: "#FFA001" }}
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
          className="bg-gray-800"
          theme={theme}
        />
        <HelperText type="error" visible={!weight} style={{ color: "#FFA001" }}>
          Weight is required.
        </HelperText>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          className="bg-secondary mt-4"
          labelStyle={{ color: "black" }}
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

export default PersonalInformationSection;
