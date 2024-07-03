import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../assets/Menu.png'
import Logo from '../assets/Logo.png'
import Search from '../assets/Search.png'
import Shopping from '../assets/shoppingBag.png'
import ListView from '../assets/Listview.png'
import Filter from '../assets/Filter.png'
import Dress1 from '../assets/dress1.png'
import Dress2 from '../assets/dress2.png'
import Dress3 from '../assets/dress3.png'
import Dress4 from '../assets/dress4.png'
import Dress5 from '../assets/dress5.png'
import Dress6 from '../assets/dress6.png'
import Dress7 from '../assets/dress7.png'
import Add from '../assets/add_circle.png'


const products = [
  { id: '1', name: 'Official Wears', description: 'reversible angora cardigan', amount: '120', image: Dress1},
  { id: '2', name: 'Black', description: 'reversible angora cardigan', amount: '120', image: Dress2},
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', amount: '120', image: Dress3},
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', amount: '120', image: Dress4},
  { id: '5', name: '21WN', description: 'reversible angora cardigan', amount: '120', image: Dress5},
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', amount: '120', image: Dress6},
  { id: '7', name: '21WN', description: 'reversible angora cardigan', amount: '120', image: Dress7},
  { id: '8', name: 'lame', description: 'reversible angora cardigan', amount: '120', image: Dress3},
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderItem = () => {
    return(
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            {
                products.map((item)=> {
                    return(
                        <View key={item.id} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between'}}>
                            <View style={{width: '40vw'}}>
                                <View>
                                    <Image style={{position: 'relative'}} source={item.image} />
                                    <TouchableOpacity onPress={() => addToCart(item)}>
                                        <Image source={Add} style={{position: 'absolute', bottom: 10, right: 10}}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{fontSize: 20}}>{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text style={{color: 'red', fontSize: 18, fontWeight: 600, letterSpacing: 3}}>${item.amount}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={Menu} />
        <Image source={Logo} />
        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10}}>
            <Image source={Search} />
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                <Image source={Shopping}/>
            </TouchableOpacity>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 30}}>
        <Text style={{fontSize: 28}}>Our story</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity style={{backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50}}>
                <Image source={ListView}/>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50, }}>
                <Image source={Filter}/>
            </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products.slice(0,1)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
});

export default HomeScreen;