<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch:{
    $route(to,from){
      setTimeout(function(){
        if(window.location.href.indexOf("home")==-1 && !window.location.href.endsWith("/")){
          document.querySelector(".sidebar-container").style.display="inline";
          document.querySelector(".navbar").style.display="inline";
          document.querySelector(".main-container").classList.remove("navbarhide");
        }else{
          document.querySelector(".sidebar-container").style.display="none";
          document.querySelector(".navbar").style.display="none";
          document.querySelector(".main-container").classList.add("navbarhide");
        }
      },100)

    }
  },
}
</script>
<style scoped>
</style>
