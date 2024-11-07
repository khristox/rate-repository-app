import { gql } from '@apollo/client';

export const POST_AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
    expiresAt
    user {
      username,
      
    }
  }
}
`;

export const POST_REVIEWS=gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId,
    repository {
      name
      ownerName
      createdAt
      reviews {
        edges {
          node {
            rating
            text
          }
        }
      }
    }
  }
}
`
// other queries...