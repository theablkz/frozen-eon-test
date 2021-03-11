<template>
  <div class="results">
    <p>
      Найдено {{ $store.state.npmSearch.results.total | digits }} результатов
    </p>
    <div
      v-for="(result, index) in $store.state.npmSearch.results.objects"
      :key="index"
      class="package-card"
      @click="modalCardIndex = index"
    >
      <div class="card-head">
        <h3>{{ result.package.name }}</h3>
        <p
          v-if="
            $store.state.npmSearch.searchValue.trim() === result.package.name
          "
          class="exact-match"
        >
          exact match
        </p>
      </div>

      <p class="card-description">{{ result.package.description }}</p>
      <ul class="tags">
        <li
          class="tags-list"
          v-for="(keywords, index) in result.package.keywords"
          :key="index"
        >
          {{ keywords }}
        </li>
      </ul>
      <p>version: {{ result.package.version }}</p>
      <p>published: {{ result.package.date | dateFormat }}</p>
      <p>publisher: {{ result.package.publisher.username }}</p>
    </div>
    <div>
      <pagination
        v-model="$store.state.npmSearch.resultPage"
        :per-page="$store.state.npmSearch.resultSize"
        :records="$store.state.npmSearch.results.total"
        @paginate="event => $store.dispatch('ACT_paginateEventPage', event)"
      />
    </div>
    <transition name="fade">
      <card-modal
        v-if="modalCardIndex !== undefined"
        @close="modalCardIndex = undefined"
        :modalData="$store.state.npmSearch.results.objects[modalCardIndex]"
      />
    </transition>
  </div>
</template>

<script>
import CardModal from "@/components/cardModal";

export default {
  name: "results",
  components: { CardModal },
  data: () => ({
    modalCardIndex: undefined,
    currentPage: 1,
    perPage: 2,
    total: 20
  })
};
</script>

<style lang="scss" scoped>
.results {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  .package-card {
    border: 1px solid green;
    border-radius: 3px;
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
    &:hover {
      cursor: pointer;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
