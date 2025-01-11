<template>
  <div class="signup-container">
    <form @submit.prevent="handleSubmit">
      <h1>Sign <span class="highlight">Up</span></h1>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        placeholder="Enter your email"
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
        placeholder="Enter your password"
      />
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        required
        placeholder="Choose a username"
      />

      <div v-if="captchaId">
        <label for="captcha">CAPTCHA:</label>
        <div v-html="captchaSvg" class="captcha-image"></div>
        <input
          type="text"
          id="captcha"
          v-model="captchaInput"
          placeholder="Enter CAPTCHA"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Sign Up' }}
      </button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div class="navigation">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        username: '',
      },
      captchaId: null,
      captchaSvg: null,
      captchaInput: '',
      isSubmitting: false,
      errorMessage: '',
    };
  },
  methods: {
    async fetchCaptcha() {
      try {
        const response = await axios.post('http://localhost:4000/captchas/generate');
        this.captchaId = response.data.id;
        this.captchaSvg = response.data.svg;
      } catch (error) {
        this.errorMessage = 'Failed to load CAPTCHA. Please refresh the page.';
      }
    },
    validateForm() {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(this.form.password)) {
        this.errorMessage = 'Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character';
        return false;
      }
      return true;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      if (!this.captchaId) {
        await this.fetchCaptcha();
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        await axios.post('http://localhost:4000/captchas/validate', {
          id: this.captchaId,
          input: this.captchaInput,
        });

        const registerResponse = await axios.post('http://localhost:4000/auth/register', this.form);

        if (registerResponse.status === 201) {
          this.$router.push('/login');
        } else {
          this.errorMessage = registerResponse.data.message || 'Registration failed.';
        }
      } catch (error) {
        if (error.response?.status === 400) {
          this.errorMessage = error.response.data.message || 'Invalid CAPTCHA.';
          this.captchaId = null;
          this.captchaInput = '';
          await this.fetchCaptcha();
        } else {
          this.errorMessage = error.response?.data?.message || 'An error occurred.';
        }
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  created() {
    this.fetchCaptcha();
  },
};
</script>

<style scoped>

* {
  margin: 0;
    padding: 0;
  box-sizing: border-box;
}

.signup-container {
  width: 90%;
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #f9f9f9, #e3f2fd);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

h1 .highlight {
  background: linear-gradient(90deg, #007bff, #ff5722);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

input {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  width: 100%;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 12px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

button:disabled {
  background: #ccc;
}

button:hover:not(:disabled) {
  background: #0056b3;
}


.captcha-image {
  margin-bottom: 15px;
}

.error {
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
}

.navigation {
  margin-top: 30px;
  text-align: center;
}

.navigation a {
  color: #007bff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 1rem;
  font-weight: bold;
}

.navigation a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .signup-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  button {
    font-size: 1rem;
  }

  .navigation a {
    font-size: 0.9rem;
    margin: 0 10px;
  }
}
</style>
