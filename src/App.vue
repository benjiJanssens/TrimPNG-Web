<template>
  <div id="app">
    <div id="content">
      <div class="columns is-centered is-vcentered is-mobile">
        <div class="column is-12-mobile is-9-tablet is-6-desktop">
          <div class="box mx-6 my-4">
            <b-upload
              drag-drop
              accept="image/png"
              @input="uploadImage"
              expanded
              v-if="!imageName"
            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"> </b-icon>
                  </p>
                  <p>Drop your PNG file here or click here to upload</p>
                </div>
              </section>
            </b-upload>
            <div v-else>
              <div class="columns is-centered is-vcentered has-text-centered">
                <div class="column is-4">
                  <img :src="imageToTrim" />
                </div>
                <div class="column is-narrow">
                  <b-icon
                    icon="arrow-right-bold"
                    size="is-large"
                    id="result-icon"
                  />
                </div>
                <div class="column is-4">
                  <img v-if="imageTrimmed" :src="imageTrimmed" />
                  <b-skeleton v-else height="100px"></b-skeleton>
                </div>
              </div>
              <div class="columns is-centered is-vcentered">
                <div class="column is-12-mobile is-9-tablet is-6-desktop">
                  <div class="buttons">
                    <b-button
                      type="is-primary"
                      expanded
                      :loading="!Boolean(imageTrimmed)"
                      tag="a"
                      :href="imageTrimmed"
                      :download="`trimpng_${imageName}`"
                      >Download</b-button
                    >
                    <b-button type="is-danger" expanded @click="resetImage"
                      >Back</b-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Made with
          <b-icon icon="heart" size="is-small" type="is-danger"> </b-icon> by
          <a href="https://benjijanssens.com">Benjamin Janssens</a> using
          <a href="https://github.com/benjiJanssens/trimpng">trimPNG</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import trimPNG from "trimpng";
import Update from "./mixins/update";

@Component
export default class App extends Mixins(Update) {
  imageName = "";
  imageToTrim: string | null = null;
  imageTrimmed: string | null = null;

  uploadImage(imageFile: File) {
    this.imageName = imageFile.name;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = event => {
      this.imageToTrim = event.target!.result as string;
      this.trimImage(event.target!.result as string);
    };
  }

  trimImage(imageDataURL: string) {
    const newImage = new window.Image();
    newImage.src = imageDataURL;
    newImage.addEventListener("load", () => {
      this.imageTrimmed = trimPNG(newImage);
    });
  }

  resetImage() {
    this.imageName = "";
    this.imageToTrim = null;
    this.imageTrimmed = null;
  }

  @Watch("registration")
  onChildChanged(value: string) {
    if (value)
      this.$buefy.snackbar.open({
        message: "TrimPNG has been updated. Refresh to apply changes.",
        actionText: "Refresh",
        indefinite: true,
        onAction: () => {
          if (this.registration && this.registration.waiting)
            this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      });
  }
}
</script>

<style lang="scss">
html,
body,
.columns {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#content {
  flex: 1;
}

img {
  border: 1px dashed #b5b5b5;
  border-radius: 6px;
  max-height: 100px !important;
}

@media only screen and (max-width: 768px) {
  #result-icon {
    transform: rotate(90deg);
  }
}
</style>
