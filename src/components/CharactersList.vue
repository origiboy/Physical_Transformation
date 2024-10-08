<template>
  <div class="characters">
    <input
      v-model="searchQuery"
      @input="debounce(() => fetchCharacters())"
      placeholder="Поиск персонажей"
      class="characters__input"
    />
    <div
      class="character-list"
      v-if="characters.length"
    >
      <CharacterItem
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <div v-else>Ничего не найдено</div>
    <div v-if="loading">Загрузка...</div>
  </div>
</template>

<script lang="ts">
  const API_ENDPOINT = 'https://rickandmortyapi.com/api'
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'

  import CharacterItem from './CharacterItem.vue'

  interface Character {
    id: number
    name: string
    image: string
  }

  export default defineComponent({
    name: 'CharactersList',
    components: {
      CharacterItem, // Register the component here
    },
    setup() {
      const characters = ref<Character[]>([])
      const searchQuery = ref<string>('')
      const page = ref<number>(1)
      const loading = ref<boolean>(false)

      const createDebounce = () => {
        let timeout: ReturnType<typeof setTimeout>
        return function (fnc: (e: KeyboardEvent) => void, delayMs?: number) {
          clearTimeout(timeout)
          timeout = setTimeout((e: KeyboardEvent) => {
            fnc(e)
          }, delayMs || 300)
        }
      }

      const fetchCharacters = async (add = false) => {
        loading.value = true
        try {
          const response = await axios.get(`${API_ENDPOINT}/character`, {
            params: {
              name: searchQuery.value,
              page: page.value,
            },
          })
          if (add) {
            characters.value = [...characters.value, ...response.data.results]
          } else {
            characters.value = [...response.data.results]
          }
        } catch (error) {
          if (!add) {
            characters.value = []
          }
        } finally {
          loading.value = false
        }
      }

      const handleScroll = () => {
        const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight
        if (bottomOfWindow && !loading.value) {
          page.value++
          fetchCharacters(true)
        }
      }

      onMounted(() => {
        fetchCharacters()
        window.addEventListener('scroll', handleScroll)
      })

      return {
        characters,
        searchQuery,
        loading,
        fetchCharacters,
        debounce: createDebounce(),
      }
    },
  })
</script>

<style scoped lang="scss">
  .characters {
    &__input {
      margin-bottom: 20px;
      padding: 4px 10px;
      border: 2px solid lightblue;
      border-radius: 4px;
    }
  }
  .character-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>