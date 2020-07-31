<template>
  <v-card style="background-color:#2d2d2d;padding-top:10px">
    <div style="text-align:center">
      <h2 style="color:#ff8c00;text-align:center">Support Me 🙏</h2>
      <p
        style=" text-align: center;text-justify: inter-word;color:gray;margin-top:20px"
      >This app is free and open source for everyone and It doesn't show any ads because I wanted to keep it like that, But there are servers running and many other things which comes to a cost and I need to pay for those. It would be really helpful if you will contribute and help me keep doing what I do. Thanks</p>
      <v-btn class="ma-2" width="150px" color="white" @click.stop="dialog = true">
        <v-img
          height="90px"
          width="130px"
          src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg"
        />
      </v-btn>
      <br />
      <v-btn width="150" class="ma-2" color="white" @click.stop="dialoggpay = true">
        <img
          height="30px"
          width="150px"
          src="https://cdn.worldvectorlogo.com/logos/google-pay-primary-logo.svg"
        />
      </v-btn>
      <br />
      <v-btn width="150" disabled class="ma-2" color="white">
        <img src="https://img.icons8.com/color/96/000000/paytm.png" />
      </v-btn>
      <h2 style="color:#ff8c00;text-align:center;margin-top:20px">Scan Paytm QR Code</h2>
      <v-card class="mx-auto over" style="margin-top:30px" max-width="344">
        <v-img src="../assets/PaytmQR.jpeg" height="344px"></v-img>
      </v-card>
    </div>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline" style="color:purple">Phone Pe UPI</v-card-title>

        <v-card-text style="color:black;font-weight:bold;font-size:20px">
          7972683640@ybl
          <!-- <v-icon style="color:#FF8C00:margin-left:60px">mdi-content-copy</v-icon> -->
          <v-btn class="ma-2" tile large color="teal" icon @click="copy">
            <v-icon style="color:#FF8C00">mdi-content-copy</v-icon>
          </v-btn>
        </v-card-text>
        <h2 id="upi" v-if="false">7972683640@ybl</h2>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialoggpay" max-width="380">
      <v-card>
        <v-card-title class="headline" style="color:purple">Google Pay UPI</v-card-title>

        <v-card-text style="color:black;font-weight:bold;font-size:15px">
          vaibhavp2807@okhdfcbank
          <!-- <v-icon style="color:#FF8C00:margin-left:60px">mdi-content-copy</v-icon> -->
          <v-btn class="ma-2" tile large color="teal" icon @click="copygoogle">
            <v-icon style="color:#FF8C00">mdi-content-copy</v-icon>
          </v-btn>
        </v-card-text>
        <h2 id="upigoogle" v-if="false">vaibhavp2807@okhdfcbank</h2>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialoggpay = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import copy from "copy-to-clipboard";
export default {
  data() {
    return {
      dialoggpay: false,
      snackbar: false,
      text: "",
      timeout: 2000,
      dialog: false,
      upi: "7972683640@ybl"
    };
  },
  methods: {
    copy() {
      copy("7972683640@ybl");
      this.text = "Phone Pe Upi Coied";
      this.dialog = false;
      this.snackbar = true;
    },
    copygoogle() {
      copy("vaibhavp2807@okhdfcbank");
      this.text = "Google Pay Upi Coied";
      this.dialoggpay = false;
      this.snackbar = true;
    }
  }
};
</script>
<style scoped>
.over:hover {
  width: "400px";
  height: "400px";
}
</style>