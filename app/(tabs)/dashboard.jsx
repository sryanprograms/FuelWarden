import React from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { images } from "../../constants";

export default function Dashboard() {
  const chartWidth = Dimensions.get("window").width - 60;

  const commonChartConfig = {
    backgroundGradientFrom: "#1e1e1e",
    backgroundGradientTo: "#1e1e1e",
    color: (opacity = 1) => `rgba(255, 160, 1, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    paddingRight: 30,
    paddingBottom: 40,
    paddingLeft: 30,
    paddingTop: 20,
    propsForLabels: {
      fontSize: 12,
      fontWeight: "bold",
    },
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with left text and right logo */}
      <Header 
        greetingText="Wearable Connection" 
        userName="Apple Watch" 
        logoSource={images.logoSmall} 
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Active Energy Expenditure */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="flame" size={28} color="#FFA001" />
            <Text style={styles.cardTitle}>Active Energy</Text>
          </View>
          <Text style={styles.cardValue}>2,350 kcal</Text>
          <Text style={styles.cardSubtitle}>Total Calories Burned Today</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
                datasets: [{ data: [200, 500, 1000, 1500, 2100, 2350] }],
              }}
              width={chartWidth}
              height={200}
              chartConfig={commonChartConfig}
              verticalLabelRotation={0}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Recovery Score */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="heart" size={28} color="#FFA001" />
            <Text style={styles.cardTitle}>Recovery Score</Text>
          </View>
          <Text style={styles.cardValue}>82%</Text>
          <Text style={styles.cardSubtitle}>Today's Recovery Level</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ["Morning", "Afternoon", "Evening"],
                datasets: [{ data: [75, 80, 82] }],
              }}
              width={chartWidth}
              height={200}
              chartConfig={commonChartConfig}
              verticalLabelRotation={0}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Sleep Quality */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="bed" size={28} color="#FFA001" />
            <Text style={styles.cardTitle}>Sleep Quality</Text>
          </View>
          <Text style={styles.cardValue}>7.5 hrs</Text>
          <Text style={styles.cardSubtitle}>Last Night's Sleep</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ["Deep", "Light", "REM"],
                datasets: [{ data: [2.5, 4, 1] }],
              }}
              width={chartWidth}
              height={200}
              chartConfig={commonChartConfig}
              verticalLabelRotation={0}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Workout Load */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="barbell" size={28} color="#FFA001" />
            <Text style={styles.cardTitle}>Workout Load</Text>
          </View>
          <Text style={styles.cardValue}>1h 15m</Text>
          <Text style={styles.cardSubtitle}>Recent Workout Duration</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ["Warm-Up", "Workout", "Cool-Down"],
                datasets: [{ data: [10, 75, 10] }],
              }}
              width={chartWidth}
              height={200}
              chartConfig={commonChartConfig}
              verticalLabelRotation={0}
              bezier
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#161622",
  },
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  card: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardValue: {
    fontSize: 22,
    color: "#FFA001",
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  chart: {
    borderRadius: 15,
    marginVertical: 8,
  },
});
