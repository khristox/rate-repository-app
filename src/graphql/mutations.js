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


// other queries...