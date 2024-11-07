import { useState, useEffect } from 'react';

import { FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { GET_REPOSITORIES,GET_REPOSITORY,GET_REVIEWS } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';


const useRepositories = () => {
  const fetchRepositories =  () => {
   // setLoading(true);

    // Replace the IP address part with your own IP address!
   // const response = await fetch('http:/192.168.83.37:5000/api/repositories');
   //const json = await response.json();
   //const { data, loading, error } = useQuery(GET_REPOSITORIES,{  fetchPolicy: 'cache-and-network',});
    //console.log('use:',data);
    setLoading(loading);
    setData(data);
   // setError(error);
  };


  let { data, error,loading } = useQuery(GET_REPOSITORIES,{  fetchPolicy: 'cache-and-network',});
  data=data?data.repositories.edges.map(repo=>repo.node):data; //replace data if undefined with array 

  return {data,  error,loading};

};


export const useRepository = (iD) => {
 
  //const route = useRoute();
  //const id= route.params;
  let { data, error,loading } = useQuery(GET_REPOSITORY,{  variables: { id: iD}, fetchPolicy: 'cache-and-network',});
  return {data,  error,loading};
  
};

export const getReviews = (iD) => {
 
  //const route = useRoute();
  //const id= route.params;
  let { data, error,loading } = useQuery(GET_REVIEWS,{  variables: { id: iD}, fetchPolicy: 'cache-and-network',});
  
  data=data?data.repository.reviews.edges.map(repo=>repo.node):data; //replace data if undefined with array 

  return {data,  error,loading};
  
};

export default useRepositories;
