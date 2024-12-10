const app = Vue.createApp({
  data() {
    return {
      carrito: JSON.parse(localStorage.getItem("carrito")) || [], // Carga los datos desde el Local Storage
    };
  },
  methods: {
    asignarCostosAleatorios() {
      this.carrito.forEach((producto) => {
        if (!producto.costo) {
          producto.costo = Math.floor(Math.random() * 1000) + 100; // Genera un costo aleatorio entre 100 y 1000
        }
      });
      this.actualizarLocalStorage();
    },
    aumentarCantidad(producto) {
      const item = this.carrito.find((p) => p.id === producto.id);
      if (item) {
        item.cantidad++;
        this.actualizarLocalStorage();
      }
    },
    disminuirCantidad(producto) {
      const item = this.carrito.find((p) => p.id === producto.id);
      if (item) {
        if (item.cantidad > 1) {
          item.cantidad--;
        } else {
          this.eliminarDelCarrito(producto);
        }
        this.actualizarLocalStorage();
      }
    },
    eliminarDelCarrito(producto) {
      this.carrito = this.carrito.filter((p) => p.id !== producto.id);
      this.actualizarLocalStorage();
    },
    actualizarLocalStorage() {
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
    },
  },
  mounted() {
    // Verifica si el Local Storage tiene datos al montar la aplicación
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
      this.carrito = carritoGuardado;
    }
    this.asignarCostosAleatorios(); // Asigna costos aleatorios al cargar la página
  },
});

app.mount("#app");
