import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'

import { createUser } from '../../lib/appwrite'


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

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

          <Text className="text-xl text-white text-semibold font-psemibold mb-[15]">Sign Up for FuelWarden</Text>

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form,
              username: e})}
              otherSytles="mt-7"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp