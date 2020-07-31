<template>
  <v-dialog v-model="dialogChoose" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Choose the streaming options</v-card-title>

      <v-card-actions>
        <v-btn class="ma-2" tile color="red" dark @click="choosemethod(video)">
          <v-icon left>mdi-youtube</v-icon>Video
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" tile color="indigo" dark @click="choosemethod(audio)">
          <v-icon left>mdi-music</v-icon>Audio
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({ dialogChoose: true })
};
</script>