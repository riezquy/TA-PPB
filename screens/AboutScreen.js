import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutScreen = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={['#FF4D4D', '#F9CB28']}
          style={styles.headerGradient}
        >
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
            <Text style={styles.title}>PokéDex pura-pura</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </Animated.View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureContainer}>
              <LinearGradient
                colors={['#FF4D4D', '#FF4D4D80']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featureCard}
              >
                <Text style={styles.featureTitle}>Browse Pokémon</Text>
                <Text style={styles.featureDescription}>
                  Cari pokemon yang anda kepoin
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['#F9CB28', '#F9CB2880']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featureCard}
              >
                <Text style={styles.featureTitle}>Detailed Info</Text>
                <Text style={styles.featureDescription}>
                  menampilkan info pokemon secara lengkap dan mantap
                </Text>
              </LinearGradient>

              <LinearGradient
                colors={['#3498DB', '#3498DB80']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featureCard}
              >
                <Text style={styles.featureTitle}>Type Explorer</Text>
                <Text style={styles.featureDescription}>
                  Cari pokemon yang kau sukai berdasarkan type dan kebutuhanmu
                </Text>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Source</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                This app uses the PokeAPI (pokeapi.co) to fetch Pokémon data.
              </Text>
            </View>
          </View>

          <View style={[styles.section, styles.lastSection]}>
            <Text style={styles.sectionTitle}>Developer</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                Dibuat untuk memenuhi tugas besar Praktikum PPB
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90, 
  },
  headerGradient: {
    padding: 30,
    paddingTop: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  version: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  featureContainer: {
    gap: 15,
  },
  featureCard: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
});

export default AboutScreen;