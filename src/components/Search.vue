<template style="background-color:#2d2d2d">
  <v-row justify="center">
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
    <v-dialog
      v-model="dialog"
      style="background-color:#2d2d2d"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="black">
          <v-btn icon dark @click="dialog = false">
            <v-icon color="#FF8C00">mdi-arrow-left</v-icon>
          </v-btn>
          <v-text-field
            style="padding-top:30px"
            color="#FF8C00"
            v-model="Keyword"
            @keypress="Suggetions"
            @keyup.enter="Search"
            placeholder="Search"
          ></v-text-field>
        </v-toolbar>

        <v-subheader>Search Result</v-subheader>
        <v-divider></v-divider>
        <div v-if="!isAuto">
          <v-card elevation="16" max-width="2000" class="mx-auto" style="background-color:#2d2d2d">
            <v-virtual-scroll :bench="benched" :items="searchResult" height="800" item-height="64">
              <template v-slot="{ item }">
                <v-list-item
                  :key="item"
                  @click="dialogChoose = true,saveData(item.id.videoId,item.snippet)"
                >
                  <v-list-item-action>
                    <v-avatar>
                      <img :src="item.snippet.thumbnails.default.url" alt="John" />
                    </v-avatar>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title style="color:white">
                      {{
                      item.snippet.title
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle style="color:white">
                      {{
                      item.snippet.channelTitle
                      }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <!-- <v-list-item-action>
                    <v-icon small>mdi-open-in-new</v-icon>
                  </v-list-item-action>-->
                </v-list-item>

                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
          </v-card>
        </div>
        <div v-if="isAuto">
          <v-list>
            <v-list-item v-for="item in Suggetions1" :key="item" @click="autocompleteclick(item)">
              <v-list-item-avatar>
                <v-icon style="color:#FF8C00">mdi-magnify</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { EventBus } from "../Envent-bus";
import axios from "axios";
import db from "../Database";
//import cors from "cors";

export default {
  data() {
    return {
      curentVideoiId: "",
      curentVideoData: [],
      video: "video",
      audio: "audio",
      dialogChoose: false,
      isAuto: true,
      benched: 0,
      dialog: false,
      notifications: false,
      key: "AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo",
      //AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo
      sound: true,
      widgets: false,
      Keyword: null,
      searchResult: null,
      Suggetions1: []
    };
  },
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 7000;
    }
  },
  methods: {
    saveData(id, vidData) {
      this.curentVideoiId = id;
      this.curentVideoData = vidData;
    },
    choosemethod(data) {
      if (data == "audio") {
        this.Play(this.curentVideoiId, this.curentVideoData);
      } else {
        var obj = { vidid: this.curentVideoiId, viddata: this.curentVideoData };
        EventBus.$emit("PlayVideo", obj);
      }

      this.dialogChoose = false;
    },
    autocompleteclick(item) {
      this.Keyword = item;
      this.Search();
    },
    Suggetions() {
      if (this.isAuto == false) {
        this.isAuto = true;
      }
      var searchKeyword = this.Keyword.replace(/\s/g, "+");

      // fetch(
      //   "https://clients1.google.com/complete/search?client=youtube&hl=en&ds=yt&q=raw"
      // )
      //   .then(function(response) {
      //     return response.json();
      //   })
      //   .then(function(result) {
      //     console.log(result);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      axios
        .get(
          "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=" +
            searchKeyword,
          {},

          {
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: "same-origin"
          }
        )
        .then(response => {
          var data = response.data;
          const searchSuggestions = [];
          data.split("[").forEach((ele, index) => {
            if (!ele.split('"')[1] || index === 1) return;
            return searchSuggestions.push(ele.split('"')[1]);
          });
          this.Suggetions1 = searchSuggestions;
        })
        .catch(error => {
          console.log(error);
        });
    },
    Play(id, vidData) {
      var data = { id, vidData };
      EventBus.$emit("PlaySongData", data);
      this.dialog = false;
      var play = true;
      ///Database code
      db.song_history
        .where({ vidid: id })
        .first(song => {
          db.song_history.delete(song.id);
        })
        .catch(error => {
          console.log(error);
        });

      var insert_object = {
        vidid: id,
        urlthumb: vidData.thumbnails.default.url,
        title: vidData.title,
        channelname: vidData.channelTitle,
        islike: 0
      };
      db.song_history.add(insert_object).catch(error => {
        console.log(error);
      });

      //Databse code end
      EventBus.$emit("play", play);
    },
    Search() {
      this.isAuto = false;
      var searchKeyword = this.Keyword.replace(/\s/g, "+");
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&order=viewCount&q=" +
            searchKeyword +
            "&maxResults=50&key=" +
            this.key
        )
        .then(response => {
          this.searchResult = response.data.items;
        });
    }
  },
  mounted() {
    EventBus.$on("Search", data => {
      this.dialog = true;
      console.log(data);
    });
  }
};
</script>
