import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, Alert} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state={
          hasCameraPermissions: null,
          scan: false,
          scannedData: '',
          buttonState: 'normal'
        }
    }

    getCameraPermission = async(ID) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermissions: status === "granted",
          buttonState: 'clicked',
          scan: false
        })
    }

    handleBarCodeScanned = async({type, data}) => {
        this.setState({
            scan: true,
            scannedData: data,
            buttonState: 'normal'
        });
    }

    render(){
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scan;
      const buttonState = this.state.buttonState;
      if(buttonState === 'clicked' && hasCameraPermissions) {
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          /> 
        );
      } 
      else if(buttonState === 'normal') {
        return(  
        <View style={styles.container}> 
            <Image
            source={require('../assets/Barcode-scanner.jpg')}
            style={{width:200,height:200}}/>
            <Text style={{fontSize: 30, textAlign: 'center'}}> Barcode Scanner </Text>
            <Text style={styles.displayText}> 
                {hasCameraPermissions===true ? this.state.scannedData: "Require Camera Permission"}
            </Text>

            <TouchableOpacity onPress={this.getCameraPermission}
             style={styles.scanButton}>
                <Text style={styles.buttonText}> Scan QR Code </Text>
            </TouchableOpacity>
        </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    scanButton:{
      backgroundColor: "black",
      width: 150,
      borderWidth: 1.5,
      marginTop: 30
    },
    displayText: {
      color: "black",
      fontSize: 15,
      textDecorationLine: "underline",
      marginTop: 30
    },
    buttonText:{
      color: "white",
      fontSize: 15,
      textDecorationLine: "underline"
    },
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10,
      color: 'white'
    },
    inputView: {
      flexDirection: 'row',
      margin: 20 
    },
    inputBox: {
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    submitButton: {
      backgroundColor: 'black',
      width: 100,
      height: 50
    },
    submitButtonText: {
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    }
});
  