<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ApolloQuery :query="require('../graphql/HelloWorld.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" class="result apollo">{{ data }}</div>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <div>
      {{ users }}
    </div>
  </div>
</template>

<script lang="ts">
import "vue-apollo";
import { ApolloResponse } from "../types";
import { Component, Prop, Vue } from "vue-property-decorator";
import gql from "graphql-tag";

interface User {
  id: number;
  username: string;
}

@Component({
  components: {},
  apollo: {
    users() {
      return {
        query: gql`
          query {
            users(order_by: { id: asc }) {
              id
              username
            }
          }
        `,
        result(result: ApolloResponse) {
          if (!result.loading) {
            console.log("result", result);
          }
        },
        fetchPolicy: "cache-and-network",
      };
    },
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  users: User[] = [];

  mounted(): void {
    console.log("mounted");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
