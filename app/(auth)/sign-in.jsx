import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'

import { signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
 
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4">
          <Image source={images.logo} 
          resizeMode='contain' className="w-[150px] h-[150px] mb-[-15] " />

          <Text className="text-xl text-white text-semibold font-psemibold mb-[15]">Log in to FuelWarden</Text>

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form,
              email: e})}
              otherSytles="mt-7"
              keyBoardType="email-address"
          />

          <FormField 
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form,
              password: e})}
              otherSytles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn