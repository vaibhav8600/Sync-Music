<template>
  <v-app>
    <v-app-bar app color="black" hide-on-scroll>
      <div class="d-flex align-center"></div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:#FF8C00"></v-app-bar-nav-icon>

      <v-toolbar-title style="color:#FF8C00">Sync Music</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="Search">
        <v-icon style="color:#FF8C00">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <MainPlayer app />
    <VideoPlayer />

    <!--footer/mini player--->
    <v-footer style="background-color:black" dark padless app v-if="isfooter" @click="maximized">
      <!-- <v-card-title></v-card-title> -->
      <v-row no-gutters @click="maximized">
        <v-avatar tile>
          <img :src="currentVidData.thumbnails.default.url" alt="John" />
        </v-avatar>
        <v-row style="width:230px;padding-left: 15px;">
          <h6 style="color:white;font-size: 10;">{{ currentVidData.title }}</h6>
        </v-row>
      </v-row>
      <v-spacer />
      <v-btn icon v-if="!isPause" @click.stop="isPause = !isPause" @click="PlayPause">
        <v-icon color="white">mdi-play</v-icon>
      </v-btn>
      <v-btn icon v-if="isPause" @click.stop="isPause = !isPause" @click="PlayPause">
        <v-icon color="white">mdi-pause</v-icon>
      </v-btn>
      <!-- <v-btn color="white" @click="maximized" icon>
        <v-icon>mdi-arrow-up-bold</v-icon>
      </v-btn>-->
      <v-btn color="white" @click="stopsong" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-progress-linear color="#FF8C00" rounded value="0"></v-progress-linear>
    </v-footer>
    <Search />
    <!--Bottom Navigation-->
    <v-bottom-navigation
      v-model="bottomNav"
      color="#FF8C00"
      grow
      style="background-color:black"
      dark
      shift
      app
    >
      <v-btn @click="gotoHome">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn @click="gotoLiked">
        <span>Liked</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <!-- <v-btn>
        <span>Downloads</span>
        <v-icon>mdi-download</v-icon>
      </v-btn>-->

      <v-btn @click="gotoHistory">
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!--drawer-->
    <v-navigation-drawer v-model="drawer" absolute temporary style="background-color:black">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="./assets/Synclogo.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="color:#FF8C00">Sync Music</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon style="color:#FF8C00">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color:#FF8C00" @click="DrawerRouteClick(item.title)">
              {{
              item.title
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import MainPlayer from "./components/MainPlayer";
import VideoPlayer from "./components/VideoPlayer";
import { EventBus } from "./Envent-bus";
import Search from "./components/Search";
import db from "./Database";
//import SwipeListener from "swipe-listener";
export default {
  name: "App",

  components: {
    MainPlayer,
    Search,
    VideoPlayer
  },
  created() {
    db.close();
    db.version(1).stores({
      song_history: "++id,vidid,urlthumb,title,channelname,islike"
    });
    // db.delete();
    db.open();
  },
  mounted() {
    EventBus.$on("miniplayer", data => {
      this.currentVidData = data;
      this.isfooter = true;
      console.log(data);
    });

    EventBus.$on("miniPlayerClose", data => {
      this.isfooter = false;
      console.log(data);
    });

    EventBus.$on("bottomnavcount", data => {
      this.bottomNav = data;
      console.log(data);
    });

    // var container = document.querySelector("#miniplayer");
    // var listener = SwipeListener(container);
    // console.log(listener);
    // let $vm = this;

    // container.addEventListener("swipe", function(e) {
    //   var directions = e.detail.directions;
    //   var x = e.detail.x;
    //   var y = e.detail.y;
    //   $vm.isfooter = false;
    //   EventBus.$emit("maximized", !$vm.isfooter);
    //   // if (directions.left) {
    //   //   console.log("Swiped left.");
    //   // }

    //   // if (directions.right) {
    //   //   console.log("Swiped right.");
    //   // }

    //   if (directions.top) {
    //     $vm.isfooter = false;
    //     EventBus.$emit("maximized", !$vm.isfooter);
    //     console.log("Swiped top.");
    //   }

    //   // if (directions.bottom) {
    //   //   $vm.dialog = false;
    //   //   EventBus.$emit("miniplayer", $vm.vidData);
    //   //   console.log($vm.vidData);
    //   //   console.log("Swiped bottom.");
    //   // }

    //   // if (directions.top && directions.right) {
    //   //   console.log("Swiped top-right.");
    //   // }

    //   // if (directions.top && directions.left) {
    //   //   console.log("Swiped top-left.");
    //   // }

    //   // if (directions.bottom && directions.right) {
    //   //   console.log("Swiped bottom-right.");
    //   // }

    //   // if (directions.bottom && directions.left) {
    //   //   console.log("Swiped bottom-left.");
    //   // }

    //   console.log("Started horizontally at", x[0], "and ended at", x[1]);
    //   console.log("Started vertically at", y[0], "and ended at", y[1]);
    // });
  },
  methods: {
    DrawerRouteClick(title) {
      if (title == "Home") {
        this.bottomNav = 0;
        this.$router.push({ name: "Home" });
      } else if (title == "Donate & Support") {
        this.$router.push({ name: "About" });
      } else if (title == "Privacy & Policy") {
        this.$router.push({ name: "PrivacyAndPolicy" });
      }
    },
    gotoHome() {
      this.$router.push({ name: "Home" });
    },
    gotoHistory() {
      this.$router.push({ name: "History" });
    },
    gotoLiked() {
      this.$router.push({ name: "Liked" });
    },
    Search() {
      var data = true;

      EventBus.$emit("Search", data);
    },
    stopsong() {
      var data = true;

      EventBus.$emit("StopSong", data);
      this.isfooter = false;
    },
    PlayPause() {
      var data = true;
      EventBus.$emit("PlayPause", data);
    },
    maximized() {
      this.isfooter = false;
      EventBus.$emit("maximized", !this.isfooter);
    },
    ClosePlayer() {
      this.isfooter = false;
      EventBus.$emit("maximized", this.isfooter);
    }
  },
  data: () => ({
    isPause: true,
    currentVidData: null,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    isfooter: false,
    bottomNav: 0,
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home" },
      { title: "Donate & Support", icon: "mdi-bank" },
      { title: "Privacy & Policy", icon: "mdi-information" }
    ]
  })
};
</script>
<style scoped>
.v-content {
  background-color: black;
}
</style>
