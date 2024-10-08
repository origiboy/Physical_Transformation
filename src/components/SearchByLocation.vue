<template>
  <div class="search">
    <input
      v-model="location"
      @input="fetchLocations"
      placeholder="Название локации"
      class="search__input"
    />
    <div class="search__locations">
      <div
        class="search__location"
        v-for="location in locations"
        :class="{ active: location.id === activeId }"
        @click="() => handleChangeActive(location.id)"
      >
        {{ location.name }}
      </div>
    </div>
    <div class="character-list">
      <CharacterItem
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<script lang="ts">
  const API_ENDPOINT = 'https://rickandmortyapi.com/api'

  import { defineComponent, ref } from 'vue'
  import axios from 'axios'

  import CharacterItem from './CharacterItem.vue'

  interface Character {
    id: number
    name: string
    image: string
  }

  interface ResponseLocation {
    id: number
    name: string
  }

  export default defineComponent({
    name: 'SearchByLocation',
    components: {
      CharacterItem, // Register the component here
    },
    setup() {
      const activeId = ref<number>(0)
      const location = ref<string>('')
      const locations = ref<ResponseLocation[]>([])
      const characters = ref<Character[]>([])

      const fetchLocationCharacters = async (locationId: number) => {
        try {
          const locationResponse = await axios.get(`${API_ENDPOINT}/location/${locationId}`)
          const characterUrls = locationResponse.data.residents
          characters.value = await Promise.all(
            characterUrls.map((url: string) => axios.get(url).then((res) => res.data))
          )
        } catch (error) {
          characters.value = []
        }
      }

      const fetchLocations = async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/location`, {
            params: { name: location.value },
          })
          const locationId = response.data.results[0].id
          activeId.value = locationId
          locations.value = []
          response.data.results.map((item: ResponseLocation) =>
            locations.value.push({
              name: item.name,
              id: item.id,
            })
          )
          fetchLocationCharacters(locationId)
        } catch (error) {
          locations.value = []
          characters.value = []
        }
      }

      const handleChangeActive = (id: number) => {
        activeId.value = id
        fetchLocationCharacters(id)
      }

      return {
        location,
        characters,
        locations,
        fetchLocations,
        fetchLocationCharacters,
        activeId,
        handleChangeActive,
      }
    },
  })
</script>

<style scoped lang="scss">
  .search {
    &__input {
      margin-bottom: 20px;
      padding: 4px 10px;
      border: 2px solid lightblue;
      border-radius: 4px;
    }

    &__locations {
      display: flex;
      flex-wrap: wrap;
    }

    &__location {
      padding: 4px 8px;
      border-radius: 4px;
      background: lightgreen;
      font-weight: 600;
      margin-bottom: 20px;

      &.active {
        background: green;
      }

      &:not(:last-child) {
        margin-right: 20px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
