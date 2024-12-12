import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161622" }}>
      {/* Header Component */}
      <Header
        greetingText="Welcome Back"
        userName="User"
        logoSource={images.logoSmall}
      />

      {/* Search Input */}
      <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
        <SearchInput />
      </View>

      {/* Content List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            thumbnail={item.thumbnail}
            description={item.description}
            link={item.purchaseLink}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No supplements found"
            subtitle="Try scanning a supplement instead..."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default Home;
