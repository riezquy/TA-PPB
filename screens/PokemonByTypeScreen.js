import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PokemonByTypeScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { typeUrl, typeName } = route.params;
  const [detailedPokemon, setDetailedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000000');
    fetchPokemonByType();
  }, []);

  const fetchPokemonByType = async () => {
    try {
      const response = await fetch(typeUrl);
      const data = await response.json();
      const pokemonList = data.pokemon.slice(0, 20);
      
      const detailedResults = await Promise.all(
        pokemonList.map(async (p) => {
          const pokemonResponse = await fetch(p.pokemon.url);
          return pokemonResponse.json();
        })
      );
      
      setDetailedPokemon(detailedResults);
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
    
    if (typeof type === 'string') {
      return colors[type] || '#95A5A6';
    }
    
    if (Array.isArray(type) && type.length > 0) {
      return colors[type[0].type.name] || '#95A5A6';
    }
    
    return '#95A5A6';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[getTypeColor(item.types), getTypeColor(item.types) + '80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <View style={styles.spriteContainer}>
            <Image
              source={{ uri: item.sprites.front_default }}
              style={styles.sprite}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <View style={styles.typesContainer}>
              {item.types.map((type, index) => (
                <Text key={index} style={styles.typeText}>
                  {type.type.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        colors={[getTypeColor(typeName), '#000000']}
        style={styles.headerContainer}
      >
        <Text style={styles.typeTitle}>{typeName.toUpperCase()} TYPE</Text>
        <Text style={styles.subtitle}>{detailedPokemon.length} Pokémon Found</Text>
      </LinearGradient>
      <FlatList
        data={detailedPokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  headerContainer: {
    padding: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },
  typeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 5,
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
    padding: 12,
    minHeight: 160,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spriteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sprite: {
    width: 90,
    height: 90,
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: 4,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    textTransform: 'capitalize',
  },
});

export default PokemonByTypeScreen;