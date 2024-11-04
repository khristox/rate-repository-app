import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query RepositoryQuery {
  repositories {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
  }
}
`;

export const GET_ME =gql`
  query MeQuery{
  me {
    id
    username
  }
}
`

export const GET_REPOSITORY =gql`
 query RepositoryQuerySingle ($id: ID!)
{
    repository(id: $id) {
      id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
    }
}
`

// other queries...