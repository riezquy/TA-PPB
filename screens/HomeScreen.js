import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const LiveBattleCard = ({ image, viewers, url }) => (
  <TouchableOpacity 
    style={styles.battleCard}
    onPress={() => Linking.openURL(url)}
  >
    <Image source={{ uri: image }} style={styles.battleImage} />
    <View style={styles.viewersContainer}>
      <View style={styles.avatarGroup}>
        <View style={styles.avatar} />
        <View style={[styles.avatar, { marginLeft: -10 }]} />
        <View style={[styles.avatar, { marginLeft: -10 }]} />
      </View>
      <Text style={styles.viewersText}>+ {viewers} Viewing</Text>
      <View style={styles.playButton}>
        <View style={styles.playIcon} />
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const navigation = useNavigation();

  const battles = [
    {
      id: '1',
      image: 'https://i.imgur.com/WKYO6FT.gif',
      viewers: 568,
      url: 'https://youtu.be/r7AQnqI4l98?si=MufT6iEW_AUn3VFI'
    },
    {
      id: '2',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzltsZVdMVmlsbYGQExbh2lMuefqu5fjOwQ&s',
      viewers: 64,
      url: 'https://youtu.be/q-fp7-63BZc?si=c7EMIBx8Lpt-MEJK'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery) {
      setPokemonList([]);
      return;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    const filteredPokemon = data.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const detailedPokemon = await Promise.all(filteredPokemon.map(async (item) => {
      const pokemonResponse = await fetch(item.url);
      return pokemonResponse.json();
    }));

    setPokemonList(detailedPokemon);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Selamat Datang{'\n'}Di pokedex abal-abal</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>



      <View style={styles.menuGrid}>
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#FFB800' }]}
          onPress={() => Linking.openURL('https://pokemon.com')}
        >
          <Text style={styles.menuText}>Pokemon.Com</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#FF1A1A' }]}
          onPress={() => navigation.navigate('Types')}
        >
          <Text style={styles.menuText}>Type</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#00B6FF' }]}
          onPress={() => Linking.openURL('https://pokemondb.net/go/evolution')}
        >
          <Text style={styles.menuText}>Evolution</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#00FF47' }]}
          onPress={() => Linking.openURL('https://pokemon.fandom.com/wiki/Pok%C3%A9mon_Wiki')}
        >
          <Text style={styles.menuText}>Wiki Pokemon</Text>
        </TouchableOpacity>
      </View>


      {pokemonList.length > 0 ? (
        <View style={styles.searchResults}>
          <Text style={styles.searchResultTitle}>Search Results</Text>
          <FlatList
            data={pokemonList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.pokemonCard}
                onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
              >
                <Text style={styles.cardTitle}>{item.name.toUpperCase()}</Text>
                <Image source={{ uri: item.sprites.front_default }} style={styles.sprite} />
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Live Battle</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.carouselContainer}
          >
            {battles.map((battle) => (
              <LiveBattleCard
                key={battle.id}
                image={battle.image}
                viewers={battle.viewers}
                url={battle.url}
              />
            ))}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    width: '48%',
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  carouselContainer: {
    paddingHorizontal: 20,
  },
  battleCard: {
    width: width - 80,
    height: 200,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
  },
  battleImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatarGroup: {
    flexDirection: 'row',
    marginRight: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#666',
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  viewersText: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
  },
  playButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: '#000',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchResults: {
    paddingHorizontal: 20,
  },
  searchResultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  sprite: {
    width: 60,
    height: 60,
  },
});

export default HomeScreen;