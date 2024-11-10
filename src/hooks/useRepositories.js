import { useState, useEffect } from 'react';

import { FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { GET_REPOSITORIES,GET_REPOSITORY,GET_REVIEWS } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';


const useRepositories = (varItem) => {
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

  const jsonData = {};
  const jsonvariables = {};
  
    if(varItem==="1")
    {
      jsonData["orderBy"] = "CREATED_AT";
     
      jsonvariables["variables"] = jsonData;
    } else if (varItem==="2"){
      jsonData["orderBy"] = "RATING_AVERAGE";
      jsonData["orderDirection"] = "DESC";
      jsonvariables["variables"] = jsonData;
    } else if (varItem==="3"){
      jsonData["orderBy"] = "RATING_AVERAGE";
      jsonData["orderDirection"] = "ASC";
      jsonvariables["variables"] = jsonData;
    }
    

    let { data, error,loading } = useQuery(GET_REPOSITORIES, {
      variables:jsonData
      , fetchPolicy: 'cache-and-network',});
      
  
  /* let { data, error,loading } = useQuery(GET_REPOSITORIES, {variables:{ "orderDirection": "ASC",
  "orderBy": "RATING_AVERAGE"}},  {  fetchPolicy: 'cache-and-network',});
   */
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
