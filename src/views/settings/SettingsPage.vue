<template>
  <div id="map"></div>
</template>

<script>

export default {
  data() {
    return {
        map: null,
        mapCenter: {lat: 0, lng: 0},
    }
  },
  mounted(){
    // this.initMap();
  },
  methods:{
    // Initialize and add the map
    initMap() {
      // The location of Uluru
      // const uluru = { lat: -25.344, lng: 131.031 };
      // // The map, centered at Uluru
      // this.map = new google.maps.Map(document.getElementById("map"), {
      //   zoom: 4, //true/false
      //   center: uluru,
      //   maxZoom: 20,
      //   minZoom: 3,
      //   streetViewControl: true,
      //   fullscreenControl: true,
      //   zoomControl: true
      // });
      // // The marker, positioned at Uluru
      // const marker = new google.maps.Marker({
      //   position: uluru,
      //   map: this.map,
      // });
    }
    
  }
}
</script>

<style scoped>
#map {
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}
</style>