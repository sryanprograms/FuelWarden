import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, TextInput, Button, HelperText } from "react-native-paper";

const theme = {
  colors: { text: "white", placeholder: "gray", primary: "#FFA001" },
};

const PersonalInformationSection = ({ initialData, onSave }) => {
  const [gender, setGender] = useState(initialData?.gender || "");
  const [heightFeet, setHeightFeet] = useState(initialData?.heightFeet || "");
  const [heightInches, setHeightInches] = useState(initialData?.heightInches || "");
  const [weight, setWeight] = useState(initialData?.weight || "");

  const validateNumericInput = (value) => /^[0-9]*$/.test(value);

  const handleSave = () => {
    if (
      gender &&
      validateNumericInput(heightFeet) &&
      validateNumericInput(heightInches) &&
      weight
    ) {
      onSave({ gender, heightFeet, heightInches, weight });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <View className="bg-gray-900 p-5 rounded-lg space-y-6">
        <Text 
          variant="titleLarge" 
          className="text-secondary text-center font-semibold mb-4"
          style={{ marginTop: 40 }} // Push text down below camera notch
        >
          Personal Information
        </Text>
        

        {/* Gender Selection */}
        <View className="space-y-2">
          <Text className="text-white mb-2">Select Gender:</Text>
          <View className="flex-row space-x-2">
            <Button
              mode={gender === "Male" ? "contained" : "outlined"}
              onPress={() => setGender("Male")}
              className={`flex-1 ${gender === "Male" ? "bg-secondary" : "bg-gray-800"}`}
              labelStyle={gender === "Male" ? { color: "black" } : { color: "white" }}
            >
              Male
            </Button>
            <Button
              mode={gender === "Female" ? "contained" : "outlined"}
              onPress={() => setGender("Female")}
              className={`flex-1 ${gender === "Female" ? "bg-secondary" : "bg-gray-800"}`}
              labelStyle={gender === "Female" ? { color: "black" } : { color: "white" }}
            >
              Female
            </Button>
          </View>
          <Button
            mode={gender === "Non-Binary/Other" ? "contained" : "outlined"}
            onPress={() => setGender("Non-Binary/Other")}
            className={`${gender === "Non-Binary/Other" ? "bg-secondary" : "bg-gray-800"}`}
            labelStyle={gender === "Non-Binary/Other" ? { color: "black" } : { color: "white" }}
          >
            Non-Binary/Other
          </Button>
        </View>
        <HelperText type="error" visible={!gender} className="text-secondary">
          Gender is required.
        </HelperText>

        {/* Height Input */}
        <View className="flex-row space-x-2">
          <TextInput
            label="Height (feet)"
            value={heightFeet}
            onChangeText={setHeightFeet}
            placeholder="Feet"
            mode="outlined"
            keyboardType="numeric"
            className="flex-1 bg-gray-800"
            theme={theme}
          />
          <TextInput
            label="Height (inches)"
            value={heightInches}
            onChangeText={setHeightInches}
            placeholder="Inches"
            mode="outlined"
            keyboardType="numeric"
            className="flex-1 bg-gray-800"
            theme={theme}
          />
        </View>
        <HelperText
          type="error"
          visible={!validateNumericInput(heightFeet) || !validateNumericInput(heightInches)}
          className="text-secondary"
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
        <HelperText type="error" visible={!weight} className="text-secondary">
          Weight is required.
        </HelperText>

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          className="bg-secondary mt-4"
          labelStyle={{ color: "black", fontWeight: "bold" }}
          disabled={
            !gender ||
            !validateNumericInput(heightFeet) ||
            !validateNumericInput(heightInches) ||
            !weight
          }
        >
          Save Info
        </Button>
      </View>
    </ScrollView>
  );
};

export default PersonalInformationSection;
