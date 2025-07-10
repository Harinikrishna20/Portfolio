async function getWeather() {
  const city = encodeURIComponent(document.getElementById("cityInput").value.trim());
  const apiKey = "127c0e8d63e13c9ffbaf4b6c3b8bf056";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("API Response:", data);  // See the full response in browser

    if (data.cod !== 200) {
      console.log("API Error:", data);  // See detailed error
      alert(`City not found! (${data.message})`);
      return;
    }

    const card = document.getElementById("weatherCard");
    card.style.display = "block";
    card.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind: ${data.wind.speed} km/h</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Network error:", error);
    alert("Error fetching weather data.");
  }
}