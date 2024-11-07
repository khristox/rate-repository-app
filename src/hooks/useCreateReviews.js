import { gql, useMutation } from '@apollo/client'
import { POST_REVIEWS } from '../graphql/mutations';

const usePostReview = () => {
    
    
    //const [authenticate, result] = useMutation(POST_AUTHENTICATE);
    const [createReview, result] = useMutation(POST_REVIEWS);
    
    const postReview = async ({reponame,name, rating, review }) => {
        
      //  console.log(typeof rating);

        const resultvalues= await createReview({  variables: {  "review": {
                "repositoryName": reponame,
            "ownerName": name,
            "rating": Number(rating),
            "text": review
          }} });
          
          
          return resultvalues;
    };

    return [postReview, result];
  };

  export default usePostReview;