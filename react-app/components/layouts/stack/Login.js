import {View,Text,StyleSheet, Alert,ActivityIndicator} from 'react-native';
import { AuthContext } from '../../../Context/AuthContext';
import { useContext, useState,useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {style} from '../../../assets/style/stylesheet.js'
import { useIsFocused } from "@react-navigation/native";
import axios from "axios"; 

export default function Login({ navigation }) {
  const [AccessToken,setAccessToken,skipintro,setskipintro,user, setuser] = useContext(AuthContext)
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [loading, setloading] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
        setemail('')
        setpassword('')
    }
}, [isFocused]);
  
   const Login = ()=>{
    setloading(true)
        axios.post('http://10.97.92.84:8000/api/user',{
        email : email,
        password : password
    })
    .then(function (response) {
        if(response.data.length > 0){
            setuser(response.data[0])
            setAccessToken(response.data[0].id)
        }
        else{
            Alert.alert('Invalid Credentials','Incorrect email or password')
            setAccessToken(null)
        }
    })
  .catch(function (error) {
    setAccessToken(null)
  })
  }

  const Signup = ()=>{
    navigation.navigate('SignUp')
  }
    return (
        <View style={style.container}>
            {loading?
            <ActivityIndicator size="large" />:null
            }
            <View style={[style.w90]}>
                <View style={[style.formcontrol,{marginBottom:25}]}>
                    <Text style={[styles.inputlabel,style.bglight,styles.phorizontal1,style.asflexstart]}>Email</Text>
                    <TextInput placeholder='example@email.com' onChangeText={(value)=> setemail(value)} style={[styles.phorizontal1]}></TextInput>
                </View>
                <View style={style.formcontrol}>
                    <Text style={[styles.inputlabel,style.bglight,styles.phorizontal1,style.asflexstart]}>Password</Text>
                    <TextInput placeholder='********' secureTextEntry={true} onChangeText={(value)=> setpassword(value)} style={[styles.phorizontal1]}></TextInput>
                </View>
                
                <View style={{marginBottom:15}}>
                {/* <TouchableOpacity>
                    <Text style={[style.asflexend,style.textprimary,style.tdunderline]}>Forgot Password?</Text>
                </TouchableOpacity> */}
                </View>
                <TouchableOpacity style={[style.btnprimary,style.borderRadius]} onPress={Login}>
                    <Text style={[style.textlight,style.textcenter]}>Login</Text>
                </TouchableOpacity>
                <View style={{marginVertical:20}}>
                    <View style={[style.ascenter,style.fdrow]}>
                        <Text>Don't have account? </Text>
                        <TouchableOpacity onPress={Signup}><Text style={style.textprimary}>create a new account</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
      );
  }

  const styles = StyleSheet.create({
    inputlabel : {
        marginTop:-15,
    },
    phorizontal1 : {
        paddingHorizontal : 10
    }
  })