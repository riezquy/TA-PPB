import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TypesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000000');
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      const mainTypes = data.results.filter(type => 
        type.name !== 'unknown' && type.name !== 'shadow'
      );
      setTypes(mainTypes);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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

  const getIconByType = (type) => {
    const typeIcons = {
      normal: 'circle-outline',
      fire: 'fire',
      water: 'water',
      electric: 'flash',
      grass: 'leaf',
      ice: 'snowflake',
      fighting: 'boxing-glove',
      poison: 'flask',
      ground: 'terrain',
      flying: 'weather-windy',
      psychic: 'brain',
      bug: 'bug',
      rock: 'pyramid',
      ghost: 'ghost',
      dragon: 'sword',
      dark: 'moon-waning-crescent',
      steel: 'shield',
      fairy: 'star-face',
    };
    return typeIcons[type] || 'help-circle';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => navigation.navigate('PokemonByType', { 
        typeUrl: item.url, 
        typeName: item.name 
      })}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[getTypeColor(item.name), getTypeColor(item.name) + '80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name={getIconByType(item.name)} 
            size={40} 
            color="#FFF"
          />
        </View>
        <Text style={styles.typeName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.typeDescription}>
          Tap to see {item.name}-type Pokémon
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading Types...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokémon Types</Text>
        <Text style={styles.headerSubtitle}>Choose a type to explore Pokémon</Text>
      </View>
      <FlatList
        data={types}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + 90 }
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  list: {
    padding: 12,
  },
  cardWrapper: {
    flex: 1,
    padding: 8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  typeDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default TypesScreen;