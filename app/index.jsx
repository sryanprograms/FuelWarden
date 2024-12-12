import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView } from 'react-native';
import { Redirect, router } from 'expo-router'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants';
import CustomButton from '../components/CustomButton';

import { useGlobalContext } from '../context//GlobalProvider'

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if(!isLoading && isLoggedIn) return <Redirect href="/home "/>

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[250px] h-[250px] mt-[-50]"
                        resizeMode="contain"
                    />

                    <Image
                        source={images.cards}
                        className="max-w--[400px] w-full h-[298px] mt-[-50]"
                        resizeMode="contain"
                    />
                    
                    <CustomButton 
                        title="Continue with Email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles={"w-full mb-[20px]"}
                    />

                </View>
            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}