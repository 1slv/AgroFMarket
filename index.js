import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>

      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Agricultores Familiares</Text>
      <Text style={styles.title2}>Disponível</Text>

      <View style={styles.card}>

        <Image source={require('../assets/horta.png')} style={styles.hortaImg} />
        <Text style={styles.hortaTxt}>Horta do Carlão</Text>
        <Text style={styles.telTxt}>TEL:14 99999-9999</Text>
        <Text style={styles.horTxt}>07:00 - 11:00</Text>
        <Text style={styles.horTxt}>14:00 - 17:00</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>REALIZAR PEDIDO</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.rodape}>
        <Link href='/login'>
          <Image source={require('../assets/profile.png')} style={styles.profileImg}/>  
        </Link>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logo :{
    width: 266,
    height: 177,
    marginTop:70,
  },
  title :{
    fontSize: 20,
    color: '#80BD1C',
    marginLeft: -100,
    fontFamily: 'BIZ UDGothic',
  },
  title2 :{
    fontSize: 20,
    color: '#CC8918',
    marginLeft: 210,
    marginTop: -26
  },
  card: {
    width: 360,
    height: 160,
    backgroundColor: '#ffff',
    marginTop: 30,
    borderRadius: 25,
  },
  hortaImg: {
    width: 110,
    height: 150,
    marginTop: 8,
    marginLeft: 15
  },
  hortaTxt: {
    marginLeft: 180,
    marginTop: -150,
    fontSize: 20,
  },
  telTxt: {
    marginLeft: 180,
  },
  horTxt: {
    marginLeft: 180,
    fontSize: 12,
  },
  button: {
    width: 153,
    height: 52,
    marginLeft: 180,
    marginTop: 10,
    backgroundColor: '#CC8918',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonTxt: {
    color: 'white',
    fontSize: 20,
    justifyContent: 'center'
    
  },
  rodape: {
    width: 430,
    height: 69,
    backgroundColor: '#CC8918',
    marginTop: 400,
    textAlign: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 45,
    width: 45,
  }

});
