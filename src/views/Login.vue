<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="fa-user" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field
                    prepend-icon="fa-lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">
                  Register
                  <v-icon right dark>fa-user-plus</v-icon>
                </v-btn>
                <v-btn color="primary">
                  Login
                  <v-icon right dark>fa-sign-in-alt</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {

}
</script>

<style>
</style>
