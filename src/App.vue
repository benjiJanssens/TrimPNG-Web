<template>
  <div id="app">
    <div id="content">
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
              <b-icon icon="arrow-right-bold" size="is-large" />
            </div>
            <div class="column is-4">
              <img v-if="imageTrimmed" :src="imageTrimmed" />
              <b-skeleton v-else height="100px"></b-skeleton>
            </div>
          </div>
          <div class="columns is-centered is-vcentered">
            <div class="column is-9">
              <div class="buttons">
                <b-button
                  type="is-primary"
                  expanded
                  :loading="!Boolean(imageTrimmed)"
                  tag="a"
                  :href="imageTrimmed"
                  :download="imageName"
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
import { Component, Vue } from "vue-property-decorator";
import trimPNG from "trimpng";

@Component
export default class App extends Vue {
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
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box {
  width: 50%;
}

img {
  border: 1px dashed #b5b5b5;
  border-radius: 6px;
  height: 100px !important;
}
</style>
