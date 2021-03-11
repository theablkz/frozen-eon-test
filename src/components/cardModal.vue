<template>
  <div ref="cardModal" class="card-modal-container">
    <div class="card-modal">
      <div class="card-info">
        <img
          class="close-button"
          @click="$emit('close')"
          src="@/assets/close.svg"
          alt=""
        />
        <div class="card-head">
          <h3>{{ modalData.package.name }}</h3>
          <p
            v-if="
              $store.state.npmSearch.searchValue.trim() ===
                modalData.package.name
            "
            class="exact-match"
          >
            exact match
          </p>
        </div>

        <p class="card-description">{{ modalData.package.description }}</p>
        <ul class="tags">
          <li
            class="tags-list"
            v-for="(keywords, index) in modalData.package.keywords"
            :key="index"
          >
            {{ keywords }}
          </li>
        </ul>
        <p>version: {{ modalData.package.version }}</p>
        <p>published: {{ modalData.package.date | dateFormat }}</p>
        <p>publisher: {{ modalData.package.publisher.username }}</p>
        <p>
          homepage
          <span
            ><a target="_blank" :href="modalData.package.links.homepage">{{
              modalData.package.links.homepage
            }}</a></span
          >
        </p>
        <p>
          bugs
          <span
            ><a target="_blank" :href="modalData.package.links.bugs">{{
              modalData.package.links.bugs
            }}</a></span
          >
        </p>
        <p>
          npm
          <span
            ><a target="_blank" :href="modalData.package.links.npm">{{
              modalData.package.links.npm
            }}</a></span
          >
        </p>
        <p>
          repository
          <span
            ><a target="_blank" :href="modalData.package.links.repository">{{
              modalData.package.links.repository
            }}</a></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardModal",
  props: ["modalData"],
  mounted() {
    document.addEventListener("click", this.clickOutListener);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.clickOutListener);
  },
  methods: {
    clickOutListener(event) {
      if (!event.target.closest(".card-modal, .package-card")) {
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .card-modal {
    position: absolute;
    background-color: white;
    border-radius: 0.25rem;
    top: 0;
    max-width: 500px;
    width: 100%;
    max-height: 500px;
    height: 100%;
    margin: auto;
    overflow: auto;
    bottom: 0;
    left: 0;
    right: 0;

    .card-info {
      padding: 1rem;
      .card-head {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        .exact-match {
          margin-left: 1rem;
          background-color: #efe7fc;
          transition: all 0.15s ease-in;
          letter-spacing: 0.4px;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          &:hover {
            background-color: #e5d7fb;
          }
        }
      }
      .card-description {
        color: rgba(0, 0, 0, 0.6);
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        margin: 0.25rem -0.5rem;
        list-style: none;
        .tags-list {
          background-color: #0000000d;
          color: #000000e6;
          margin: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
        }
      }
      .close-button {
        width: 24px;
        height: 24px;
        float: right;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
