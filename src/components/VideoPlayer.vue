<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-sheet color="gray" v-if="!isDataLoaded" class="px-3 pt-3 pb-3">
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-sheet>
      <v-card style="background-color:#2d2d2d;" v-if="isDataLoaded">
        <v-toolbar dark color="black">
          <v-btn icon dark @click="stopsong">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title style="color:#FF8C00">Sync Music Video</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark color="#FF8C00" @click="sheet = true">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <!-- <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
        <!-- <iframe
          id="youtube_player"
          class="yt_player_iframe"
          :width="screenWidth"
          :height="screenHeight/3"
          autoplay="1"
          :src="videoUrl"
          allowfullscreen="true"
          allowscriptaccess="always"
          frameborder="0"
        ></iframe>-->
        <youtube
          :video-id="videoid"
          @ended="ended"
          ref="youtube"
          :height="screenHeight/3"
          :width="screenWidth"
          @playing="playing"
        ></youtube>
        <v-row style="width:350px;padding-left: 15px;">
          <h6 style="color:#FF8C00;font-size: 20px;">{{ channelData.title }}</h6>
        </v-row>
        <v-toolbar dark color="black" tile>
          <v-avatar size="40">
            <img :src="channelData.thumbnails.default.url" />
          </v-avatar>
          <v-toolbar-title style="margin-left:20px;color:#FF8C00">{{channelData.channelTitle}}</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>-->
        </v-toolbar>
        <!-- <v-card :max-width="screenWidth" dark color="#2d2d2d">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Description</div>

              <p style="color:gray;">{{channelData.description}}</p>
            </v-list-item-content>
          </v-list-item>
        </v-card>-->
        <!-- <div>
          <v-container
            id="scroll-target"
            style="max-height: 400px; width:330;"
            class="overflow-y-auto"
          >
            <v-row
              v-scroll:#scroll-target="onScroll"
              align="center"
              justify="center"
              style="height: 500px; width:300;color:gray"
            >{{channelData.description}}</v-row>
          </v-container>
        </div>-->
      </v-card>
      <v-bottom-sheet v-model="sheet">
        <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn color="purple" dark v-bind="attrs" v-on="on">Open In</v-btn>
        </template>-->
        <v-list>
          <v-subheader>Suggested Playlist</v-subheader>
          <v-list-item
            v-for="(item, index) in Playlist"
            :key="index"
            @click="sheet = false"
            :class="index == songindex - 1 ? 'activesonplaylist' : ''"
          >
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img :src="item.snippet.thumbnails.default.url" />
              </v-avatar>
              <!-- <v-avatar>
                      <img :src="item.snippet.thumbnails.default.url" alt="John" />
              </v-avatar>-->
            </v-list-item-avatar>
            <v-list-item-title>{{ item.snippet.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-bottom-sheet>
    </v-dialog>

    <!--footer/mini player--->
    <!-- <v-footer style="background-color:black" dark padless app v-if="isfooter" @click="maximized">
      <v-card-title></v-card-title>
      <v-row no-gutters @click="maximized">
        <v-avatar tile>
          <img :src="channelData.thumbnails.default.url" alt="John" />
        </v-avatar>
        <v-row style="width:200px;padding-left: 15px;">
          <h6 style="color:white;font-size: 10;">{{channelData.title}}</h6>
        </v-row>
      </v-row>
      <v-spacer />
      <v-btn icon v-if="!isPause" @click.stop="isPause = !isPause" @click="PlayPause">
        <v-icon color="white">mdi-play</v-icon>
      </v-btn>
      <v-btn icon v-if="isPause" @click.stop="isPause = !isPause" @click="PlayPause">
        <v-icon color="white">mdi-pause</v-icon>
      </v-btn>
      <v-btn color="white" @click="maximized" icon>
        <v-icon>mdi-arrow-up-bold</v-icon>
      </v-btn>
      <v-btn color="white" @click="stopsong" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-progress-linear color="#FF8C00" rounded value="0"></v-progress-linear>
    </v-footer>-->
  </v-row>
</template>

<script>
import { EventBus } from "../Envent-bus";
import axios from "axios";

export default {
  data() {
    return {
      sheet: false,
      offsetTop: 0,
      isPause: true,
      isfooter: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      key: "AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo",
      iframePlayer: "",
      screenWidth: "",
      screenHeight: "",
      videoid: "",
      videoUrl: "",
      channelData: [],
      chid: "",
      isDataLoaded: false,
      Playlist: []
    };
  },
  methods: {
    ended() {
      alert("ended");
      this.videoid = this.Playlist[0].id.videoId;
      this.player.stopVideo();
      this.player.playVideo();
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
    // maximized() {
    //   var width = window.innerWidth;
    //   var height = window.innerHeight;
    //   this.screenWidth = width;
    //   this.screenHeight = height / 3;

    //   this.dialog = true;
    //   this.isfooter = false;
    // },
    stopsong() {
      EventBus.$emit("miniPlayerClose", false);
      this.player.stopVideo();
      this.dialog = false;
    }
    // PlayPause() {
    //   if (this.player.playVideo()) {
    //     this.player.pauseVideo();
    //   } else {
    //     this.player.pauseVideo();
    //   }
    // },
    // miniYTPlayer() {
    //   this.screenWidth = 30;
    //   this.screenHeight = 59;
    //   this.dialog = false;
    //   this.isfooter = true;
    // }
  },
  created() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    console.log(this.screenHeight / 3);
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },

  mounted() {
    EventBus.$on("PlayVideo", data => {
      this.dialog = true;
      this.channelData = data.viddata;
      console.log(data.viddata);
      this.videoid = data.vidid;
      console.log(this.videoid);

      axios
        .get(
          "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=" +
            this.videoid +
            "&maxResults=5&type=video&key=AIzaSyC7PMHLFX__3PlFrY0uW-asvhBBuqMj0G4"
        )
        .then(response => {
          this.Playlist = response.data.items;

          console.log(response.data.items);
        })
        .catch(erroe => {
          console.log(erroe);
        });

      // axios
      //   .get(
      //     "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=UCWi_65E_L8tQZ34C6wVAlpQ&key=AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo" +
      //       data.viddata.channelId +
      //       "&key=" +
      //       this.key
      //   )
      //   .then(response => {
      //     this.chid = response.data.items[0].id;
      //     //this.channelData = response.data.items[0].snippet;
      //     console.log(response.data.items[0].id);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      // axios
      //   .get(
      //     "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" +
      //       this.chid +
      //       "&key=AIzaSyDBoHnHl1Vao7dbTiOMizWVPP7fnNVGRBo"
      //   )
      //   .then(response => {
      //     //this.channelData = response.data.items[0].snippet;
      //     console.log(response);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      axios
        .get(
          "https://www.googleapis.com/youtube/v3/videos?part=player&id=" +
            data.vidid +
            "&key=" +
            this.key
        )
        .then(response => {
          this.iframePlayer = response.data.items[0].player.embedHtml;

          var str = this.iframePlayer;
          var res = str.split(" ");
          res.forEach(element => {
            if (element.startsWith("src")) {
              this.videoUrl = element.slice(5, -1);
              console.log(element.slice(5, -1));
            }
          });
          if (this.screenWidth > 900) {
            this.screenWidth = "500";
            this.iframePlayer = this.iframePlayer.replace(
              "270",
              this.screenHeight / 3
            );
          } else {
            this.iframePlayer = this.iframePlayer.replace(
              "480",
              this.screenWidth
            );
            this.iframePlayer = this.iframePlayer.replace(
              "270",
              this.screenHeight / 3
            );
          }
          this.isDataLoaded = true;
          //   console.log(this.iframePlayer);
          EventBus.$emit("miniPlayerClose", false);
          EventBus.$emit("StopSong", data);
          this.player.playVideo();
        })
        .catch(error => {
          console.log(error);
        });

      // var id = localStorage.getItem("currentVideoID");
      // console.log(localStorage.getItem("currentVideoID"));
    });
  }
};
</script>