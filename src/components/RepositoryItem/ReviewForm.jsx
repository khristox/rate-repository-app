import React from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, StatusBar } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card } from 'react-native-paper';
import reviewForm from '../../../src/hooks/useCreateReviews'
import { ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router-dom';



import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';



const initialValues={
  reponame:'flutter',
  name: 'khristox',
  rating: 10,
  review: 'This work has been reviewed and OK'
};

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
    reponame: Yup.string()
    .required('Repository Owner Name is required')
    .min(2, 'Name should have at least 2 characters'),
  
     name: Yup.string()
    .required('Name is required')
    .min(2, 'Name should have at least 2 characters'),

    rating: Yup.number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .positive('Rating must be a positive number')
    .integer('Rating must be an integer') 
    .min(0, 'Number must be greater than or equal to 0')
    .max(100, 'Number must be less than or equal to 100'),
    
    review: Yup.string()
    .required('Reviews are  required')
});

const MyForm = ({ navigation }) => {
  const navigate = useNavigate();

    //const navigation = useNavigation(); // useNavigation hook  
  const [usePostReview]=reviewForm()

  const onSubmit = async (values) => {
    
    formik.setFieldValue("error","");

  
          
      try {
          let {reponame,name,rating,review}=values;
          const { data,error } = await usePostReview({ reponame, name,rating,review });
          const reviewId=data.createReview.repositoryId;

          navigate('/', {"form":"Details","id":reviewId});

          //onPress={()=>navigate('/createReview', { itemId: 86 })}

        } catch (e) {
       
          e instanceof ApolloError? e : new ApolloError({
              graphQLErrors: Array.isArray(e) ? e : [e]});;
         // console.log('Error:',e);
          
          (e instanceof ApolloError ?   
          formik.setFieldValue("error",e.message):formik.setFieldValue("error",JSON.stringify(e)));

        }
  
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
});


  return (
        <>
          <SafeAreaProvider>
          <SafeAreaView style={[{padding:10}]}>
          <ScrollView >
            <Card>
            <Text style={styles.paragraph}>
            Please use this form to create your reviews.
            </Text>
           
            <View style={styles.field}>
                <Text>Repository Owner Name</Text>
                <TextInput
                placeholder='Repository Owner Name'  
                style={styles.input}
                onChangeText={formik.handleChange('reponame')}
                onBlur={formik.handleBlur('reponame')}
                value={formik.values.reponame}
                />
                {formik.touched.reponame && formik.errors.reponame && <Text style={styles.error}>{formik.errors.reponame}</Text>}
            </View>
            <View style={styles.field}>
            <Text>Repository Name</Text>
                <TextInput
                
                style={styles.input}
                placeholder='Repository Name'  
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && <Text style={styles.error}>{formik.errors.name}</Text>}
            </View>
            <View style={styles.field}>
                <Text>Rating</Text>
                <TextInput
                    placeholder='Rating between 0 and 100'  
                    style={styles.input}
                    onChangeText={formik.handleChange('rating')}
                    onBlur={formik.handleBlur('rating')}
                    value={formik.values.rating.toString()}
                    keyboardType="numeric"
                    />
                {formik.touched.rating && formik.errors.rating && <Text style={styles.error}>{formik.errors.rating}</Text>}
            </View>
            <View style={styles.field}>
            <Text>Review</Text>
            <TextInput
                    placeholder='Review'
                    style={styles.para1}
                    onChangeText={formik.handleChange('review')}
                    onBlur={formik.handleBlur('review')}
                    value={formik.values.review}
                    height={100}
                    numberOfLines={3}
                    multiline={true}
                    />
            
            {formik.touched.review && formik.errors.review && <Text style={styles.error}>{formik.errors.password}</Text>}
          </View>

            <Button onPress={formik.handleSubmit} title="Submit" />
           
            { formik.values.error? <Text>Error: {JSON.stringify( formik.values.error)  }</Text> :"" } 
            </Card>
       
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
        </>
    
  )
  }



const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'top',
        backgroundColor: '#ecf0f1',
        padding: 2,
      },
  container: {
    flex: 1,
    justifyContent: 'top',
    padding: 20,
  },
  field: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
    
  },
  para1: {
    justifyContent: "flex-start",
    textAlignVertical: 'top',
  
    verticalAlign: 'top',
    textAlign: 'left',
    height:50,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    
  }
});

export default MyForm;
