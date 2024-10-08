<template>
  <div class="character-card">
    <img
      :src="character.image"
      alt="Character Image"
    />
    <h3>{{ character.name }}</h3>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  interface Character {
    id: number
    name: string
    image: string
  }

  export default defineComponent({
    name: 'CharacterItem',
    props: {
      character: {
        type: Object as () => Character,
        required: true,
      },
    },
    setup(props) {
      return {
        character: props.character, // Access the character prop
      }
    },
  })
</script>

<style scoped lang="scss">
  .character-card {
    width: calc(25% - 35px);
    text-align: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  .character-card:hover {
    transform: scale(0.8);
  }
  .character-card img {
    width: 100%;
    border-radius: 50%;
  }
  @media (max-width: 768px) {
    .character-card {
      flex: 1 1 calc(50% - 20px);
    }
  }
  @media (max-width: 480px) {
    .character-card {
      flex: 1 1 100%;
    }
  }
</style>