import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { User } from '@supabase/supabase-js'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  async function signOut() {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      Alert.alert('Error signing out', error.message)
    } else {
      setUser(null)
      setEmail('')
      setPassword('')
      Alert.alert('Success', 'You have been signed out successfully!')
    }
    setLoading(false)
  }

  // Check for existing session on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
      }
    }
    
    checkUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      {user ? (
        // User is logged in - show logout section
        <View style={styles.loggedInContainer}>
          <View style={styles.userInfo}>
            <Input
              label="Logged in as"
              value={user.email || 'Unknown'}
              disabled={true}
              leftIcon={{ type: 'font-awesome', name: 'user' }}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button 
              title="Sign Out" 
              disabled={loading} 
              onPress={() => signOut()}
              buttonStyle={styles.logoutButton}
            />
          </View>
        </View>
      ) : (
        // User is not logged in - show login/signup form
        <>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
          </View>
          <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  loggedInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    width: '100%',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
  },
})