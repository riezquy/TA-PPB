import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const PokemonListScreen = ({ navigation }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#000000');
    fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=8');
  }, []);

  const fetchPokemon = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const results = await Promise.all(
        data.results.map(async (item) => {
          const pokemonResponse = await fetch(item.url);
          return pokemonResponse.json();
        })
      );
      setPokemon(results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getTypeColor = (types) => {
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
    const primaryType = types[0].type.name;
    return colors[primaryType] || '#95A5A6';
  };

  const renderItem = ({ item }) => {
    const mainColor = getTypeColor(item.types);
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={[mainColor, mainColor + '80']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <Image
              source={{ uri: item.sprites.front_default }}
              style={styles.sprite}
            />
            <Text style={styles.name}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            {item.types.map((type, index) => (
              <Text key={index} style={styles.typeText}>
                {type.type.name}
              </Text>
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: 90 }
        ]}
        showsVerticalScrollIndicator={false}
      />
      {(nextUrl || prevUrl) && (
        <View style={styles.pagination}>
          {prevUrl && (
            <TouchableOpacity 
              style={styles.paginationButton} 
              onPress={() => fetchPokemon(prevUrl)}
            >
              <LinearGradient
                colors={['#FF4D4D', '#F9CB28']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.paginationText}>Previous</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {nextUrl && (
            <TouchableOpacity 
              style={styles.paginationButton} 
              onPress={() => fetchPokemon(nextUrl)}
            >
              <LinearGradient
                colors={['#FF4D4D', '#F9CB28']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.paginationText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    padding: 16,
    height: 180,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  pagination: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  paginationButton: {
    marginHorizontal: 4,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PokemonListScreen;