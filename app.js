const API_KEY = "64a53c50f3690cb8ff7425889a26f2a0" ;

const app = Vue.createApp({
  data() {
    return {
      city: "",
      weather: null,
      error: ""
    };
  },

  computed: {
    iconUrl() {
      if (!this.weather) return "";
      const icon = this.weather.weather[0].icon;
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
  },

  methods: {
    async getWeather() {
      if (!this.city) {
        this.error = "Please enter a city name.";
        this.weather = null;
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${API_KEY}&units=metric`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          this.error = "City not found. Try again.";
          this.weather = null;
          return;
        }

        this.weather = await res.json();
        this.error = "";
      } catch (err) {
        this.error = "Network error. Try again later.";
      }
    }
  }
});

app.mount("#app");
