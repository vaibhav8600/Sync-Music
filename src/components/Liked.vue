<template>
  <!-- ... the buttons ... -->

  <div>
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
    <v-card
      elevation="16"
      max-width="2000"
      class="mx-auto"
      style="background-color:#2d2d2d"
      id="historyswipe"
    >
      <v-virtual-scroll
        :bench="benched"
        :items="historyData.slice().reverse()"
        height="800"
        item-height="64"
      >
        <template v-slot="{ item }">
          <v-list-item :key="item" @click="dialogChoose = true,saveData(item.vidid)">
            <v-list-item-action>
              <v-avatar>
                <img :src="item.urlthumb" alt="John" />
              </v-avatar>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title style="color:white">
                {{
                item.title
                }}
              </v-list-item-title>
              <v-list-item-subtitle style="color:white">
                {{
                item.channelname
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>
<script>
import db from "../Database";
import axios from "axios";
import { EventBus } from "../Envent-bus";
import SwipeListener from "swipe-listener";
import router from "../router";
export default {
  data: () => ({
    curentVideoiId: "",
    curentVideoData: [],
    video: "video",
    audio: "audio",
    dialogChoose: false,
    benched: 0,
    historyData: [],
    key: "AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo"
  }),
  created() {
    this.getdata();
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
    saveData(id) {
      this.curentVideoiId = id;
      console.log(id);
      //this.curentVideoData = vidData;
    },
    choosemethod(data) {
      if (data == "audio") {
        this.play(this.curentVideoiId);
      } else {
        axios
          .get(
            "https://www.googleapis.com/youtube/v3/videos?id=" +
              this.curentVideoiId +
              "&part=snippet&key=" +
              this.key
          )
          .then(Response => {
            var snipetData = Response.data.items[0].snippet;

            this.curentVideoData = snipetData;
            var obj = {
              vidid: this.curentVideoiId,
              viddata: this.curentVideoData
            };
            EventBus.$emit("PlayVideo", obj);
            console.log(this.curentVideoData);
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.dialogChoose = false;
    },

    play(id) {
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/videos?id=" +
            id +
            "&part=snippet&key=" +
            this.key
        )
        .then(Response => {
          var snipetData = Response.data.items[0].snippet;
          var data = { id, snipetData };
          EventBus.$emit("PlaySongDataHistory", data);

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
            urlthumb: snipetData.thumbnails.default.url,
            title: snipetData.title,
            channelname: snipetData.channelTitle,
            islike: 1
          };
          db.song_history.add(insert_object).catch(error => {
            console.log(error);
          });

          //Databse code end
          var play = true;
          EventBus.$emit("play", play);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getdata() {
      //let firstFriend = await db.song_history.get(1);
      const data = await db.song_history
        .where("islike")
        .above(0)
        .toArray();
      //  console.log(firstFriend);
      this.historyData = data;
      console.log(data);
    }
  },
  mounted() {
    var container = document.querySelector("#historyswipe");
    var listener = SwipeListener(container);
    console.log(listener);
    container.addEventListener("swipe", function(e) {
      var directions = e.detail.directions;
      var x = e.detail.x;
      var y = e.detail.y;
      // let $vm = this;
      if (directions.left) {
        router.push({ name: "History" });
        var data = 2;
        EventBus.$emit("bottomnavcount", data);
        console.log("Swiped left.");
      }

      if (directions.right) {
        router.push({ name: "Home" });
        data = 0;
        EventBus.$emit("bottomnavcount", data);
        console.log("Swiped right.");
      }

      if (directions.top) {
        console.log("Swiped top.");
      }

      if (directions.bottom) {
        console.log("Swiped bottom.");
      }

      if (directions.top && directions.right) {
        console.log("Swiped top-right.");
      }

      if (directions.top && directions.left) {
        console.log("Swiped top-left.");
      }

      if (directions.bottom && directions.right) {
        console.log("Swiped bottom-right.");
      }

      if (directions.bottom && directions.left) {
        console.log("Swiped bottom-left.");
      }

      console.log("Started horizontally at", x[0], "and ended at", x[1]);
      console.log("Started vertically at", y[0], "and ended at", y[1]);
    });
  }
};
</script>
