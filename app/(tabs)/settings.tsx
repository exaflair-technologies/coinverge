import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { user, signOut, loading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      Alert.alert('Logout Failed', error.message);
      return;
    }
    setShowLogoutModal(false);
  };

  const handleEditProfile = () => {
    // Initialize form with current user data
    setEditForm({
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    // Here you would typically update the user profile via Supabase
    Alert.alert('Success', 'Profile updated successfully!');
    setShowEditModal(false);
  };

  const handleSecuritySettings = () => {
    Alert.alert('Security Settings', 'Security settings feature coming soon!');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Notification settings feature coming soon!');
  };

  const handleLanguage = () => {
    Alert.alert('Language', 'Language selection feature coming soon!');
  };

  const handleCurrency = () => {
    Alert.alert('Currency', 'Currency selection feature coming soon!');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Help center feature coming soon!');
  };

  const handleAbout = () => {
    setShowAboutModal(true);
  };

  const handleContact = () => {
    setShowContactModal(true);
  };

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  // Dynamic styles based on theme
  const getDynamicStyles = () => ({
    settingItem: {
      backgroundColor: isDark ? '#1f1f1f' : '#f5f5f5',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    settingText: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#000000',
      fontWeight: '500' as const,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: isDark ? '#ffffff' : '#000000',
      marginBottom: 15,
    },
  });

  const dynamicStyles = getDynamicStyles();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: isDark ? '#272727' : '#e0e0e0' }]}>
          <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#000000' }]}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <View style={[styles.profileCard, { backgroundColor: isDark ? '#1f1f1f' : '#f5f5f5' }]}>
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getUserInitials()}</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={[styles.profileName, { color: isDark ? '#ffffff' : '#000000' }]}>{getUserDisplayName()}</Text>
                <Text style={[styles.profileEmail, { color: isDark ? '#9ca3af' : '#666666' }]}>{user?.email}</Text>
                <View style={styles.profileStatus}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Verified</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>Account</Text>
          
          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleEditProfile}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>👤</Text>
              <Text style={dynamicStyles.settingText}>Profile Information</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleSecuritySettings}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔒</Text>
              <Text style={dynamicStyles.settingText}>Security</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleNotifications}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={dynamicStyles.settingText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#272727', true: '#8b45ff' }}
              thumbColor={notifications ? '#ffffff' : '#9ca3af'}
            />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Preferences</Text>
          
          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌙</Text>
              <Text style={dynamicStyles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#272727', true: '#8b45ff' }}
              thumbColor={isDark ? '#ffffff' : '#9ca3af'}
            />
          </View>

          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleLanguage}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌍</Text>
              <Text style={dynamicStyles.settingText}>Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>English</Text>
              <Text style={styles.settingArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleCurrency}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>💰</Text>
              <Text style={dynamicStyles.settingText}>Currency</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>USD</Text>
              <Text style={styles.settingArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>👆</Text>
              <Text style={dynamicStyles.settingText}>Biometric Login</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: '#272727', true: '#8b45ff' }}
              thumbColor={biometric ? '#ffffff' : '#9ca3af'}
            />
          </View>

          <View style={dynamicStyles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔐</Text>
              <Text style={dynamicStyles.settingText}>Two-Factor Authentication</Text>
            </View>
            <Switch
              value={twoFactor}
              onValueChange={setTwoFactor}
              trackColor={{ false: '#272727', true: '#8b45ff' }}
              thumbColor={twoFactor ? '#ffffff' : '#9ca3af'}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleHelp}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>❓</Text>
              <Text style={dynamicStyles.settingText}>Help & Support</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleContact}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📧</Text>
              <Text style={dynamicStyles.settingText}>Contact Us</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleAbout}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>ℹ️</Text>
              <Text style={dynamicStyles.settingText}>About</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={() => setShowLogoutModal(true)}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Coinverge v1.0.0</Text>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout from your account?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonConfirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: 400 }]}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: isDark ? '#9ca3af' : '#666666' }]}>Full Name</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: isDark ? '#272727' : '#f0f0f0',
                  color: isDark ? '#ffffff' : '#000000',
                  borderColor: isDark ? '#272727' : '#e0e0e0'
                }]}
                value={editForm.fullName}
                onChangeText={(text) => setEditForm({...editForm, fullName: text})}
                placeholder="Enter your full name"
                placeholderTextColor={isDark ? '#6b7280' : '#999999'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: isDark ? '#9ca3af' : '#666666' }]}>Email</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: isDark ? '#272727' : '#f0f0f0',
                  color: isDark ? '#ffffff' : '#000000',
                  borderColor: isDark ? '#272727' : '#e0e0e0'
                }]}
                value={editForm.email}
                onChangeText={(text) => setEditForm({...editForm, email: text})}
                placeholder="Enter your email"
                placeholderTextColor={isDark ? '#6b7280' : '#999999'}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: isDark ? '#9ca3af' : '#666666' }]}>Phone Number</Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: isDark ? '#272727' : '#f0f0f0',
                  color: isDark ? '#ffffff' : '#000000',
                  borderColor: isDark ? '#272727' : '#e0e0e0'
                }]}
                value={editForm.phone}
                onChangeText={(text) => setEditForm({...editForm, phone: text})}
                placeholder="Enter your phone number"
                placeholderTextColor={isDark ? '#6b7280' : '#999999'}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonCancel}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonConfirm}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalButtonConfirmText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* About Us Modal */}
      <Modal
        visible={showAboutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: 400 }]}>
            <Text style={styles.modalTitle}>About Coinverge</Text>
            
            <View style={styles.aboutContent}>
              <Text style={[styles.aboutText, { color: isDark ? '#9ca3af' : '#666666' }]}>
                Coinverge is a modern cryptocurrency trading platform designed to provide users with a seamless and secure way to buy, sell, and manage their digital assets.
              </Text>
              
              <Text style={[styles.aboutSection, { color: isDark ? '#ffffff' : '#000000' }]}>Version</Text>
              <Text style={[styles.aboutText, { color: isDark ? '#9ca3af' : '#666666' }]}>1.0.0</Text>
              
              <Text style={[styles.aboutSection, { color: isDark ? '#ffffff' : '#000000' }]}>Built With</Text>
              <Text style={[styles.aboutText, { color: isDark ? '#9ca3af' : '#666666' }]}>
                • React Native & Expo{'\n'}
                • TypeScript{'\n'}
                • Supabase{'\n'}
                • React Navigation
              </Text>
              
              <Text style={[styles.aboutSection, { color: isDark ? '#ffffff' : '#000000' }]}>Features</Text>
              <Text style={[styles.aboutText, { color: isDark ? '#9ca3af' : '#666666' }]}>
                • Real-time cryptocurrency trading{'\n'}
                • Secure authentication{'\n'}
                • Dark/Light theme support{'\n'}
                • Portfolio management{'\n'}
                • Price alerts and notifications
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.modalButtonConfirm}
              onPress={() => setShowAboutModal(false)}
            >
              <Text style={styles.modalButtonConfirmText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Contact Us Modal */}
      <Modal
        visible={showContactModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: 400 }]}>
            <Text style={styles.modalTitle}>Contact Us</Text>
            
            <View style={styles.contactContent}>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📧</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: isDark ? '#ffffff' : '#000000' }]}>Email</Text>
                  <Text style={[styles.contactValue, { color: isDark ? '#9ca3af' : '#666666' }]}>support@coinverge.com</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📞</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: isDark ? '#ffffff' : '#000000' }]}>Phone</Text>
                  <Text style={[styles.contactValue, { color: isDark ? '#9ca3af' : '#666666' }]}>+1 (555) 123-4567</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>🌐</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: isDark ? '#ffffff' : '#000000' }]}>Website</Text>
                  <Text style={[styles.contactValue, { color: isDark ? '#9ca3af' : '#666666' }]}>www.coinverge.com</Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📍</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: isDark ? '#ffffff' : '#000000' }]}>Address</Text>
                  <Text style={[styles.contactValue, { color: isDark ? '#9ca3af' : '#666666' }]}>
                    123 Crypto Street{'\n'}
                    Digital City, DC 12345{'\n'}
                    United States
                  </Text>
                </View>
              </View>

              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>⏰</Text>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: isDark ? '#ffffff' : '#000000' }]}>Support Hours</Text>
                  <Text style={[styles.contactValue, { color: isDark ? '#9ca3af' : '#666666' }]}>
                    Monday - Friday: 9:00 AM - 6:00 PM EST{'\n'}
                    Saturday: 10:00 AM - 4:00 PM EST{'\n'}
                    Sunday: Closed
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.modalButtonConfirm}
              onPress={() => setShowContactModal(false)}
            >
              <Text style={styles.modalButtonConfirmText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#272727',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8b45ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  profileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#4ade80',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#8b45ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingItem: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#9ca3af',
    marginRight: 8,
  },
  settingArrow: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButtonCancel: {
    flex: 1,
    backgroundColor: '#272727',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalButtonConfirm: {
    flex: 1,
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  // New styles for edit profile, about, and contact modals
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  aboutContent: {
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  aboutSection: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  contactContent: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    lineHeight: 18,
  },
});
