<template>
  <v-main style="background-color:#2d2d2d;padding-top:10px">
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

    <h2 style="  padding-left: 35px;color: #ff8c00;" id="container1">Trending</h2>

    <v-sheet
      v-if="!isDataLoad"
      color="gray"
      style="background-color:#2d2d2d"
      class="px-3 pt-3 pb-3"
    >
      <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-card class="mx-auto" max-width="350" style="margin-top:10px">
      <v-carousel
        v-if="isDataLoad"
        cycle
        height="230"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(item, i) in YTdata" :key="i">
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class>
                <v-img
                  :src="item.snippet.thumbnails.high.url"
                  height="230px"
                  max-width="350px"
                  @click="dialogChoose = true,saveData(item.id, item.snippet)"
                ></v-img>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>

    <!-- <div class="scrolling-wrapper">
      <div class="card" v-for="item in YTdata" :key="item.id">
        <v-col>
          <v-card
            class="pa-2"
            style="background-color:#2d2d2d"
            @click="play(item.id, item.snippet)"
          >
            <v-card class="mx-auto" max-width="330" style="background-color:#ff8c00">
              <v-img :src="item.snippet.thumbnails.high.url" height="200px"></v-img>

              <v-card-title>{{ item.snippet.title }}</v-card-title>
            </v-card>
          </v-card>
        </v-col>
      </div>
    </div>-->

    <h2 class="demo" style="margin-top:10px" id="container">Romantic</h2>
    <div class="scrolling-wrapper">
      <v-sheet
        v-if="!isDataLoad"
        color="gray"
        style="background-color:#2d2d2d"
        class="px-3 pt-3 pb-3"
      >
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-sheet>
      <div class="card" v-for="item in YRomanticdata" :key="item.id">
        <v-col>
          <v-card
            class="pa-2"
            style="background-color:#2d2d2d"
            @click="dialogChoose = true,saveData(item.snippet.resourceId.videoId, item.snippet)"
          >
            <v-card class="mx-auto" max-width="290" style="background-color:#2d2d2d">
              <v-img :src="item.snippet.thumbnails.high.url" height="200px"></v-img>

              <v-card-title style="color:#ff8c00">{{ item.snippet.title }}</v-card-title>
            </v-card>
          </v-card>
        </v-col>
      </div>
    </div>
    <h2 class="demo" id="container2">New Release</h2>
    <div class="scrolling-wrapper">
      <v-sheet
        v-if="!isDataLoad"
        color="gray"
        style="background-color:#2d2d2d"
        class="px-3 pt-3 pb-3"
      >
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-sheet>
      <div class="card" v-for="item in YLdata" :key="item.id">
        <v-col>
          <v-card
            class="pa-2"
            style="background-color:#2d2d2d"
            @click="dialogChoose = true,saveData(item.snippet.resourceId.videoId, item.snippet)"
          >
            <v-card class="mx-auto" max-width="290" style="background-color:#2d2d2d">
              <v-img :src="item.snippet.thumbnails.high.url" height="200px"></v-img>

              <v-card-title style="color:#ff8c00">{{ item.snippet.title }}</v-card-title>
            </v-card>
          </v-card>
        </v-col>
      </div>
    </div>
    <h2 class="demo" id="container3">Top Bollywood Music</h2>
    <div class="scrolling-wrapper">
      <v-sheet
        v-if="!isDataLoad"
        color="gray"
        style="background-color:#2d2d2d"
        class="px-3 pt-3 pb-3"
      >
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-sheet>
      <div
        class="card"
        v-for="item in YTopBollywooddata"
        :key="item.id"
        @click="dialogChoose = true,saveData(item.snippet.resourceId.videoId, item.snippet)"
      >
        <v-col>
          <v-card class="pa-2" style="background-color:#2d2d2d">
            <v-card class="mx-auto" max-width="290" style="background-color:#2d2d2d">
              <v-img :src="item.snippet.thumbnails.high.url" height="200px"></v-img>
              <v-card-title style="color:#ff8c00">{{ item.snippet.title }}</v-card-title>
            </v-card>
          </v-card>
        </v-col>
      </div>
    </div>
  </v-main>
</template>
<script>
import axios from "axios";
import { EventBus } from "../Envent-bus";
import db from "../Database";
import SwipeListener from "swipe-listener";
import router from "../router";

export default {
  data: () => ({
    curentVideoiId: "",
    curentVideoData: [],
    video: "video",
    audio: "audio",
    dialogChoose: false,
    isDataLoad: false,
    inject: ["theme"],
    key: "AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo",
    //AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo
    //AIzaSyC7PMHLFX__3PlFrY0uW-asvhBBuqMj0G4
    YTdata: [],
    YLdata: [],
    videoData: null,
    thumbnail: null,
    YRomanticdata: [],
    YTopBollywooddata: [],
    LatestSongs: "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
    RomanticSongs: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy",
    EdmSongs: "PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5",
    TopBolloywood: "PLcRN7uK9CFpPkvCc-08tWOQo6PAg4u0lA",
    TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
    Reggaeton: "PLS_oEMUyvA728OZPmF9WPKjsGtfC75LiN"
  }),
  methods: {
    saveData(id, vidData) {
      this.curentVideoiId = id;
      this.curentVideoData = vidData;
    },
    choosemethod(data) {
      if (data == "audio") {
        this.play(this.curentVideoiId, this.curentVideoData);
      } else {
        var obj = { vidid: this.curentVideoiId, viddata: this.curentVideoData };
        EventBus.$emit("PlayVideo", obj);
      }

      this.dialogChoose = false;
    },
    async CheckDb() {
      //let firstFriend = await db.song_history.get(1);
      const oldFriends = await db.song_history
        .where("id")
        .above(0)
        .toArray();
      //  console.log(firstFriend);
      console.log(oldFriends);
    },
    play(id, vidData) {
      var data = { id, vidData };
      EventBus.$emit("PlaySongData", data);
      var play = true;
      EventBus.$emit("play", play);
      localStorage.setItem("currentsongData", vidData);

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

      this.CheckDb();
      //Databse code end
    },

    getdata() {
      //Trending Music
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=10&regionCode=IN&maxResults=5&key=" +
            this.key
        )
        .then(response => {
          this.YTdata = response.data.items;

          //console.log(this.YTdata);
        })
        .catch(error => {
          console.log(error);
        });

      //Letest Music
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=" +
            this.LatestSongs +
            "&key=" +
            this.key
        )
        .then(response => {
          this.YLdata = response.data.items;
          console.log(this.YLdata);
        });

      //Romantic Music
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=" +
            this.RomanticSongs +
            "&key=" +
            this.key
        )
        .then(response => {
          this.YRomanticdata = response.data.items;
          // console.log(this.YRomanticdata);
        });

      //Top  Bollywood Music
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=" +
            this.TopBolloywood +
            "&key=" +
            this.key
        )
        .then(response => {
          this.YTopBollywooddata = response.data.items;
          this.isDataLoad = true;
          // console.log(this.YTopBollywooddata);
        });
    }
  },
  beforeMount() {
    this.getdata();
  },
  mounted() {
    ///11
    var container = document.querySelector("#container");

    var listener = SwipeListener(container);
    console.log(listener);
    container.addEventListener("swipe", function(e) {
      var directions = e.detail.directions;
      var x = e.detail.x;
      var y = e.detail.y;
      // let $vm = this;
      if (directions.left) {
        router.push({ name: "Liked" });
        var data = 1;
        EventBus.$emit("bottomnavcount", data);
        console.log("Swiped left.");
      }

      if (directions.right) {
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

    ///222
    var container1 = document.querySelector("#container1");

    var listener1 = SwipeListener(container1);
    console.log(listener1);
    container1.addEventListener("swipe", function(e) {
      var directions = e.detail.directions;
      var x = e.detail.x;
      var y = e.detail.y;
      // let $vm = this;
      if (directions.left) {
        router.push({ name: "Liked" });
        var data = 1;
        EventBus.$emit("bottomnavcount", data);
        console.log("Swiped left.");
      }

      if (directions.right) {
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

    ///222
    var container2 = document.querySelector("#container2");

    var listener2 = SwipeListener(container2);
    console.log(listener2);
    container2.addEventListener("swipe", function(e) {
      var directions = e.detail.directions;
      var x = e.detail.x;
      var y = e.detail.y;
      // let $vm = this;
      if (directions.left) {
        router.push({ name: "Liked" });
        var data = 1;
        EventBus.$emit("bottomnavcount", data);
        console.log("Swiped left.");
      }

      if (directions.right) {
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

    ///222
    var container3 = document.querySelector("#container3");

    var listener3 = SwipeListener(container3);
    console.log(listener3);
    container3.addEventListener("swipe", function(e) {
      var directions = e.detail.directions;
      var x = e.detail.x;
      var y = e.detail.y;
      // let $vm = this;
      if (directions.left) {
        router.push({ name: "Liked" });
        var data = 1;
        EventBus.$emit("bottomnavcount", data);
        console.log("Swiped left.");
      }

      if (directions.right) {
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
<style scoped>
.demo {
  padding-left: 35px;
  color: #ff8c00;
}
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.card {
  display: inline-block;
}
</style>
