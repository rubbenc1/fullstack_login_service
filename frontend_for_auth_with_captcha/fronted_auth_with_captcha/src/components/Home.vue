<template>
  <div class="container">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
      <router-link to="/signup" class="nav-link">Sign Up</router-link>
    </nav>

    <!-- Main Content -->
    <div class="home-content">
      <h1>Welcome to Our App</h1>
      <p>Explore our application by logging in or signing up!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_page",
};
</script>

<style scoped>
/* Overall container styling */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #6a11cb,rgb(18, 60, 133));
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Navigation bar */
.navbar {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.nav-link {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ffd700;
  text-decoration: underline;
  transform: scale(1.1);
}

/* Home content */
.home-content {
  margin-top: 4rem;
  text-align: center;
}

.home-content h1 {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.home-content p {
  margin-top: 1.5rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Add smooth transitions */
a, h1, p {
  transition: all 0.3s ease-in-out;
}
</style>
