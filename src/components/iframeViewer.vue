<template>
  <iframe
    :src="link"
    width="100%"
    height="100%"
    controls
    controlsList="nodownload"
  ></iframe>
</template>

<style scoped>
video::-internal-media-controls-download-button {
  display: none;
}

video::-webkit-media-controls-enclosure {
  overflow: hidden;
}
</style>

<script>
export default {
  name: "iframeViewer",
  props: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  // computed: {
  //     link() {
  //     return `link/${encodeURIComponent(this.name)}.pdf`;
  //     }
  // }
};
</script>
