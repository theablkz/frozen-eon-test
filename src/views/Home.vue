<template>
  <div class="home">
    <div class="max-width">
      <div class="home-content">
        <div class="search-box">
          <input
            class="search-box--input"
            type="text"
            :value="$store.state.npmSearch.searchValue"
            @input="
              event => $store.dispatch('ACT_npmSearch', event.target.value)
            "
          />
        </div>
        <component :is="$store.state.npmSearch.stateComponent" />
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
// @ is an alias to /src
import FooterComponent from "@/components/layouts/footerComponent";
import Idle from "@/components/idle";

export default {
  name: "Home",
  components: {
    Idle,
    FooterComponent
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .home-content {
    padding: 0 0.5rem;
    .search-box {
      height: 50px;
      margin: 1rem 0 2rem 0;
      border: 1px solid #ff5627;
      padding: 0 1rem;
      border-radius: 3px;
      &--input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        font-size: 20px;
      }
    }
  }
}
</style>
