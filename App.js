import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import './assets/red_x.png';
import './assets/green_check.png';

export default function App() {

  // setup all of the states using hooks
  const [hasPermission, setHasPermission] = useState(null);
  const [itemNum, setItemNum] = useState("")
  const [stock, setStock] = useState(null)
  const [scanned, setScanned] = useState(false);

  // Make sure the app has permissions to use the camera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Set all of the states when a barcode gets scanned
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setItemNum(data)
    setStock(Math.floor(Math.random() * 5))
  };

  // Failsafe for users without permissions to camera
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View
      style={styles.container}>

        {/* Camera box on the top half of the screen */}
        <View
        style={styles.cameraBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject} />

        {scanned && 
          <TouchableOpacity 
            title={'Tap to Scan Again'} 
            onPress={() => setScanned(false)} 
            style={styles.scanAgainButton}>
              <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        }
      </View>

      {/* Description box containing the item number and randomly generated stock number */}
      <View
        style={styles.descriptionBox}>
          <Image 
            source={require('./assets/Steelcase.png')}
            style={styles.steelcaseLogo}
          />
            <Text
              style={styles.description}>
              Item Number: {itemNum}
            </Text>
            <Text
              style={styles.description}>
                Stock: {stock}
            </Text>
            {/* Ternary operator for setting the image at the bottom. If inventory is 0, set it as red x, otherwise it shouold be the green check */}
            {stock === 0 ? <Image style={styles.stockImage} source={require('./assets/red_x.png')}/> : <Image style={styles.stockImage} source={require('./assets/green_check.png')}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "flex-start"
  },
  stockImage: {
    flex: .7,
    width: null,
    height: null, 
    resizeMode: 'contain',
    margin: 20
  },
  scanAgainButton: {
    marginBottom: 20,
    alignSelf: "center",
  },
  scanAgainText: {
    color: 'white',
    fontSize: 22
  },
  steelcaseLogo: {
    width: 160, 
    resizeMode: "contain"
  },
  description: {
    fontSize: 22,
    margin: 12
  },
  cameraBox: {
    flex: .6,
    justifyContent: "flex-end"
  },
  descriptionBox: {
    flex:.4
  }
});
