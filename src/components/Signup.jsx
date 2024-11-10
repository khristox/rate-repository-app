import Text from './Text';
import {  SafeAreaView, StyleSheet ,TextInput,Button,Platform} from 'react-native';
import { Card } from 'react-native-paper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../contexts/AuthContext';
import useSignUp from '../hooks/useSignUp';



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      
      
    },
    para1: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        height:50,
        borderWidth:1,
        
      },
      text: {
        color: Platform.select({
          android: 'green',
          ios: 'blue',
          default: 'black',
        }),
        textAlign: 'center',
        fontSize: 12,
      },
  });


 //   const [signIn] = useSignIn();
  


    

    const initialValues = {
        username: 'khristox',
        password: 'password',
        passwordConfirmation: 'password',
    };
 
const validationSchema = yup.object().shape({
    username: yup
      .string()
      .max(30,'Too long')
      .min(5, 'Too short')
      .required('User name is required'),
    password: yup
      .string()
      .max(50,'Too long')
      .min(5, 'Password Too short')
      .required('Password is  required'),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
  
const SignUpForm = () => {
   
  const navigate = useNavigate();

  const [signIn]= useAuth().signIn();
  const [signUp]= useSignUp();;


  const onSubmit = async (values) => {
    
    formik.setFieldValue("error","");
    
    const { username, password } = values;

    try {
      //const  {data,errors} = await signIn({ username, password });
      
      
      const {data,errors} = await signUp({ username, password });
      const signRes = await signIn({ username, password });
      data && navigate('/'); 
      
    //  const err=errors.reduce(function(result,err){return result.concat(err)});
     
      if (errors)
      {
        const error =String(errors).split("ApolloError: ")[1];
         formik.setFieldValue("error",String(error));
         
      }
      
     
      
      
      
    } catch (e) {
      
      formik.setFieldValue("error",e.message);
    }

  };
  
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    useEffect(() => {
      if (formik.values.error && formik.values.error.length > 0) {
        setTimeout(() => {
          // Perform actions after the timeout (e.g., navigate, show alert, etc.)
          formik.setFieldValue("error",'');
           
        }, 5000);
      }
      
    }, [formik.values.error && formik.values.error.length>0 ]);
    //let values=formik.values;
    //
    //console.log('Chr',values);

    return <>
            <SafeAreaView style={[styles.container,{padding:20}]}>
            <Text style={styles.paragraph}>
              The Sign Up Form .
            </Text>
            
            <Card >
                
                <TextInput style={[styles.para1,{height:50}]} placeholder="User Name"
                  value={formik.values.username}
                  onChangeText={formik.handleChange('username') }

                />
                {formik.touched.username && formik.errors.username && (
                    <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
                )}
                <TextInput secureTextEntry={true} style={[styles.para1]}
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                />
                 {formik.touched.password && formik.errors.password && (
                    <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
                )}
                <TextInput secureTextEntry={true} style={[styles.para1]}
                    placeholder="Password Confirnamtion"
                    value={formik.values.passwordConfirmation}
                    onChangeText={formik.handleChange('passwordConfirmation')}
                />
                 {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                    <Text style={{ color: 'red' }}>{formik.errors.passwordConfirmation}</Text>
                )}
                <Button
                    onPress={formik.handleSubmit}
                    title="Log In"
                    color="#0b0472"
                    accessibilityLabel="Log In"
                    />
                    
                  { formik.values.error? <Text>Error: {formik.values.error}</Text> :"" } 
                  
            </Card>
            </SafeAreaView>
            
            
    </>;
  }



export default SignUpForm;