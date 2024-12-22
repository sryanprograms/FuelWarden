import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TrainingScheduleSection = ({ initialData, onSave }) => {
  const [weeklySchedules, setWeeklySchedules] = useState(initialData?.schedules || {});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentActivity, setCurrentActivity] = useState('');
  const [time, setTime] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [temporaryTime, setTemporaryTime] = useState(new Date());

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAddActivity = () => {
    if (currentActivity && time && selectedDays.length > 0) {
      setWeeklySchedules((prev) => {
        const updatedSchedules = { ...prev };
        selectedDays.forEach((day) => {
          updatedSchedules[day] = [
            ...(updatedSchedules[day] || []),
            { activity: currentActivity, time },
          ];
        });
        return updatedSchedules;
      });
      resetModal();
    }
  };

  const resetModal = () => {
    setModalVisible(false);
    setCurrentActivity('');
    setTime(null);
    setSelectedDays([]);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'set') {
      setTemporaryTime(selectedTime || temporaryTime);
    }
  };

  const confirmTime = () => {
    const formattedTime = temporaryTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTime(formattedTime);
    setShowTimePicker(false);
  };

  const handleSave = () => {
    onSave({ schedules: weeklySchedules });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 20 }}>
      <View className="bg-gray-900 p-5 rounded-lg space-y-6">
        <Text variant="titleLarge" className="text-secondary text-center font-bold mb-4 mt-6">
          Training Schedule
        </Text>

        {/* Weekly Schedules */}
        {daysOfWeek.map((day) => (
          <View key={day} className="bg-gray-800 p-3 rounded-lg mb-3">
            <Text className="text-secondary font-bold">{day}</Text>
            {weeklySchedules[day]?.length > 0 ? (
              weeklySchedules[day].map((activity, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center mt-2"
                >
                  <Text className="text-white">
                    {activity.time} - {activity.activity}
                  </Text>
                  <IconButton
                    icon="delete"
                    color="#FFA001" // bg-secondary color
                    onPress={() => {
                      setWeeklySchedules((prev) => ({
                        ...prev,
                        [day]: prev[day].filter((_, i) => i !== index),
                      }));
                    }}
                  />
                </View>
              ))
            ) : (
              <Text className="text-white mt-2">No activities yet</Text>
            )}
          </View>
        ))}

        {/* Add New Activity Button */}
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          className="bg-secondary"
          labelStyle={{ color: 'black' }}
        >
          Add New Activity
        </Button>

        {/* Modal for Adding New Activity */}
        <Modal
          animationType="slide"
          transparent={false} // Full-screen modal
          visible={modalVisible}
          onRequestClose={resetModal}
        >
          <View className="flex-1 bg-gray-900 p-5">
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-secondary font-bold text-lg">
                Add New Activity
              </Text>
              <IconButton
                icon="close"
                color="#FFA001"
                onPress={resetModal}
                className="p-0"
              />
            </View>

            {/* Activity Input */}
            <TextInput
              label="Activity"
              value={currentActivity}
              onChangeText={setCurrentActivity}
              placeholder="Enter activity"
              mode="outlined"
              className="bg-gray-800 mb-4"
              theme={{ colors: { text: 'white', placeholder: 'gray', primary: '#FFA001' } }} // bg-secondary
            />

            {/* Time Picker */}
            <View className="space-y-2 mb-4">
              <Text className="text-gray-400 font-bold">Select Time:</Text>
              <Button mode="outlined" onPress={() => setShowTimePicker(true)}>
                {time || 'Pick a Time'}
              </Button>
              {showTimePicker && (
                <View>
                  <DateTimePicker
                    value={temporaryTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                  />
                  <View className="flex-row justify-around mt-2">
                    <Button mode="contained" onPress={confirmTime} className="bg-secondary">
                      Confirm
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() => setShowTimePicker(false)}
                      className="border-secondary"
                      labelStyle={{ color: '#FFA001' }}
                    >
                      Cancel
                    </Button>
                  </View>
                </View>
              )}
            </View>

            {/* Day Selection */}
            <View className="space-y-2 mb-4">
              <Text className="text-gray-400 font-bold">Select Days:</Text>
              <View className="flex-row flex-wrap justify-start gap-2">
                {daysOfWeek.map((day) => (
                  <TouchableOpacity
                    key={day}
                    onPress={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedDays.includes(day) ? 'bg-secondary' : 'bg-gray-800'
                    }`}
                  >
                    <Text
                      className={`${
                        selectedDays.includes(day) ? 'text-black' : 'text-white'
                      }`}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Save and Cancel Buttons */}
            <Button
              mode="contained"
              onPress={handleAddActivity}
              className="bg-secondary mt-4"
              labelStyle={{ color: 'black' }}
              disabled={!currentActivity || !time || selectedDays.length === 0}
            >
              Save New Activity
            </Button>
            <Button
              mode="outlined"
              onPress={resetModal}
              className="mt-3 border-secondary"
              labelStyle={{ color: '#FFA001' }}
            >
              Cancel
            </Button>
          </View>
        </Modal>

        {/* Save All Schedules */}
        <Button
          mode="contained"
          onPress={handleSave}
          className="bg-secondary"
          labelStyle={{ color: 'black' }}
          disabled={Object.entries(weeklySchedules).length === 0}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

export default TrainingScheduleSection;
