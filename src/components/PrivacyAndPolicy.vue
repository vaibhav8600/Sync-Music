<template>
  <v-card style="background-color:#2d2d2d;padding-top:10px">
    <div>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader style="color:#ff8c00;font-size:20px;font-weight:bold;">Our Privacy and Policy</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p style=" text-align: justify;text-justify: inter-word;color:gray">
              Vaibhav built the Sync Music app as an Open Source app. This SERVICE is provided by Vaibhav Rajput at no cost and is intended for use as is.
              This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.
              The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Sync Music unless otherwise defined in this Privacy Policy.
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader
          style="color:#ff8c00;font-size:20px;font-weight:bold;"
        >Information Collection and Use</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p
              style=" text-align: justify;text-justify: inter-word;color:gray"
            >We never ask you for any of your personal information and device info, all the data stays on your device and our Service(s) are intended to work from the client-side so you never need to worry about your data being collected on our servers.</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader style="color:#ff8c00;font-size:20px;font-weight:bold;">Log Data</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p
              style=" text-align: justify;text-justify: inter-word;color:gray"
            >I want to inform you that whenever you use my Service, you never have to worry about any login data or Google OAuth as it works without you having to sign-in by any login method to use our Service(s)</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader style="color:#ff8c00;font-size:20px;font-weight:bold;">Service Providers</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p
              style=" text-align: justify;text-justify: inter-word;color:gray"
            >I never employ any third-party companies and individuals except YouTube and other related Google services.</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader style="color:#ff8c00;font-size:20px;font-weight:bold;">Security</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p
              style=" text-align: justify;text-justify: inter-word;color:gray"
            >I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. We never store your any personal information on our services. Our Service is intended to function fully from the client-side without data being collected to our servers.</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader
          style="color:#ff8c00;font-size:20px;font-weight:bold;"
        >Changes to This Privacy Policy</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p
              style=" text-align: justify;text-justify: inter-word;color:gray"
            >I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-subheader style="color:#ff8c00;font-size:20px;font-weight:bold;">Contact Us</v-subheader>
      </v-list>
      <v-divider style="background-color:white"></v-divider>
      <v-list three-line subheader style="background-color:#2d2d2d">
        <v-list-item>
          <v-list-item-content>
            <p style=" text-align: justify;text-justify: inter-word;color:gray">
              If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at
              <a
                style="color:#ff8c00"
                @click="email"
              >vaibhav.p2807@gmail.com.</a>
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    email() {
      window.open("mailto:vaibhav.p2807@gmail.com", "_blank");
    }
  }
};
</script>
<style scoped>
.content {
  margin-left: 50px;
}
</style>
