import React from 'react';
import {View,Text,StyleSheet, TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase'

export default class Login extends React.Component {

    constructor(){
        super();
        this.state={
          email : '',
          password: ''
        }
      }
    
          loginalert(errorCode){
              switch(errorCode){
                  case 'auth/too-many-requests':
                      Alert.alert("user not found")
                      this.setState({
                        email: "",
                        password: "",
                      })
                      break
                  case 'auth/wrong-password':
                      Alert.alert('invalid password')
                      this.setState({
                        password:"",
                      })
                      break
                  default:
                    this.setState({
                      email:"",
                      password:"",
                    })

                  return Alert.alert("Invalid email and password")
              }
          }
        
       

  render(){
      return(
        <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
        <View>
        <TextInput
          style={styles.loginBox}
          placeholder="abc@example.com"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              email: text
            })
          }}
          value={this.state.email}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="Enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
          value={this.state.password}
        />
        </View>
        <View>
        <TouchableOpacity
            style={styles.button}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      )
  }
}


const styles = StyleSheet.create({
  loginBox:
  {
    width: 300,
  height: 40,
  borderWidth: 1.5,
  fontSize: 20,
  margin:10,
  paddingLeft:10
  },
  button:{
    width:"75%",
    height:"11%",
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderColor:'#ffff',
    borderRadius:15
  }
})
