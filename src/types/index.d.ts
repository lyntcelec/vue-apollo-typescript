declare module "vue-cli-plugin-apollo/graphql-client";

export interface ApolloResponse {
  data: any;
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}
