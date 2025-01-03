import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { OPENAI_API_KEY, ASSISTANT_ID } from "@env"; // Import the API key from .env

const MealPlanFetcher = ({ userInput, onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("[MealPlanFetcher] Starting meal plan fetch process...");
        console.log("[MealPlanFetcher] User Input:", JSON.stringify(userInput, null, 2));

        // Step 1: Create a Thread
        console.log("[MealPlanFetcher] Creating a new thread...");
        const threadId = await createThread();

        // Step 2: Add a Message to the Thread
        console.log(`[MealPlanFetcher] Adding message to thread ID: ${threadId}...`);
        await addMessageToThread(threadId, userInput);

        // Step 3: Run the Assistant
        console.log(`[MealPlanFetcher] Running assistant for thread ID: ${threadId}...`);
        await runAssistant(threadId, "asst_ReQlBPMThRfC1919lQueBf3F", onDataFetched);
      } catch (err) {
        console.error("[MealPlanFetcher] Error during meal plan fetch:", err.message);
        setError(err);
      } finally {
        setLoading(false);
        console.log("[MealPlanFetcher] Meal plan fetch process finished.");
      }
    };

    if (userInput) {
      fetchMealPlan();
    }
  }, [userInput, onDataFetched]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFA001" />
      </View>
    );

  if (error)
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ color: "red", textAlign: "center" }}>
          Error: {error.message}
        </Text>
      </View>
    );

  return null;
};

// Step 1: Create a Thread
async function createThread() {
  try {
    const response = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "OpenAI-Beta": "assistants=v2", // Add the required beta header
      },
    });

    console.log("[CreateThread] Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[CreateThread] Response Error:", errorText);
      throw new Error(
        `Failed to create thread: ${response.status} ${response.statusText}. Details: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("[CreateThread] Thread Created Successfully:", data);
    return data.id; // Return the thread ID
  } catch (error) {
    console.error("[CreateThread] Error:", error.message);
    throw error;
  }
}

// Step 2: Add a Message to the Thread
async function addMessageToThread(threadId, userInput) {
  try {
    const messageContent = `Generate a meal plan for the following data: ${JSON.stringify(userInput)}`;
    console.log("[AddMessageToThread] Message Content:", messageContent);

    const response = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({
          role: "user",
          content: messageContent,
        }),
      }
    );

    console.log("[AddMessageToThread] Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[AddMessageToThread] Response Error:", errorText);
      throw new Error(
        `Failed to add message: ${response.status} ${response.statusText}. Details: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("[AddMessageToThread] Message Added Successfully:", data);
  } catch (error) {
    console.error("[AddMessageToThread] Error:", error.message);
    throw error;
  }
}

// Step 3: Run the Assistant
async function runAssistant(threadId, assistantId, onDataFetched) {
  try {
    console.log("[RunAssistant] Starting Assistant run...");
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
        },
        body: JSON.stringify({ assistant_id: assistantId }),
      }
    );

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      throw new Error(
        `Failed to start Assistant run: ${runResponse.statusText}. Details: ${errorText}`
      );
    }

    const runData = await runResponse.json();
    let status = runData.status;
    const runId = runData.id;

    console.log("[RunAssistant] Assistant Run Started:", runData);

    let result = null;
    const timeoutMs = 60000; // Timeout after 60 seconds
    const startTime = Date.now();

    while (status !== "completed") {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error("Assistant run timed out.");
      }

      const pollResponse = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "OpenAI-Beta": "assistants=v2",
          },
        }
      );

      if (!pollResponse.ok) {
        const errorText = await pollResponse.text();
        throw new Error(
          `Failed to poll Assistant run: ${pollResponse.statusText}. Details: ${errorText}`
        );
      }

      result = await pollResponse.json();
      status = result.status;

      if (status === "failed") {
        throw new Error(
          `Assistant run failed: ${JSON.stringify(result.last_error)}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (!result.response) {
      throw new Error("Assistant response is missing from the result.");
    }

    if (result.response.data) {
      if (typeof onDataFetched === "function") {
        onDataFetched(result.response.data);
      }
    } else {
      throw new Error("Assistant response is missing expected 'data' field.");
    }
  } catch (error) {
    console.error("[RunAssistant] Error:", error.message);
    throw error;
  }
}





export default MealPlanFetcher;