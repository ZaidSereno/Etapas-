const app = Vue.createApp({
    data() {
      return {
        personaje: null, // Detalles del personaje
      };
    },
    async mounted() {
      this.obtenerDetalles();
    },
    methods: {
      async obtenerDetalles() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
          console.error('ID no encontrado en la URL');
          return;
        }
  
        try {
          const respuesta = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
          this.personaje = respuesta.data;
        } catch (error) {
          console.error('Error al obtener los detalles del personaje:', error);
        }
      },
      volver() {
        window.location.href = 'index.html'; // Redirige de vuelta a la página principal
      },
    },
  });
  
  app.mount("#app");
