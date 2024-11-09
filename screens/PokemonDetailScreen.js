import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const PokemonDetailScreen = ({ route }) => {
  const { pokemon } = route.params;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000000');
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const StatBar = ({ value, color }) => {
    const width = (value / 255) * 100;
    return (
      <View style={styles.statBarContainer}>
        <LinearGradient
          colors={[color, color + '80']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.statBar, { width: `${width}%` }]}
        />
      </View>
    );
  };

  const getTypeColor = (type) => {
    const colors = {
      normal: '#A8A77A',
      fire: '#FF4444',
      water: '#3498DB',
      electric: '#F1C40F',
      grass: '#58D68D',
      ice: '#7FB3D5',
      fighting: '#E74C3C',
      poison: '#9B59B6',
      ground: '#CA6F1E',
      flying: '#5DADE2',
      psychic: '#FF48A5',
      bug: '#82E0AA',
      rock: '#935116',
      ghost: '#8E44AD',
      dragon: '#3498DB',
      dark: '#2C3E50',
      steel: '#85929E',
      fairy: '#FF69B4',
    };
    return colors[type] || '#95A5A6';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={[getTypeColor(pokemon.types[0].type.name), '#000']}
          style={styles.headerGradient}
        >
          <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={styles.image}
            />
          </Animated.View>
        </LinearGradient>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Height</Text>
              <Text style={styles.detailValue}>{pokemon.height / 10}m</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Weight</Text>
              <Text style={styles.detailValue}>{pokemon.weight / 10}kg</Text>
            </View>
          </View>

          <View style={styles.typesContainer}>
            <Text style={styles.sectionTitle}>Types</Text>
            <View style={styles.typeContainer}>
              {pokemon.types.map((type, index) => (
                <LinearGradient
                  key={index}
                  colors={[getTypeColor(type.type.name), getTypeColor(type.type.name) + '80']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.typeBox}
                >
                  <Text style={styles.typeText}>{type.type.name}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            {pokemon.stats.map((stat, index) => (
              <View key={index} style={styles.statContainer}>
                <Text style={styles.statName}>
                  {stat.stat.name.replace('-', ' ').toUpperCase()}
                </Text>
                <Text style={styles.statValue}>{stat.base_stat}</Text>
                <StatBar 
                  value={stat.base_stat} 
                  color={getTypeColor(pokemon.types[0].type.name)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: '#333',
  },
  detailBox: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  typesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeBox: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  typeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statsContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 90, // Padding untuk navbar
  },
  statContainer: {
    marginBottom: 15,
  },
  statName: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statBarContainer: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
  },
});

export default PokemonDetailScreen;