# Base image resmi dari Puppeteer (sudah include Chromium & dependensi)
FROM ghcr.io/puppeteer/puppeteer:latest

# Buat folder kerja
WORKDIR /app

# Copy package info dan install dependency
COPY package*.json ./
RUN npm install

# Copy semua file source ke dalam container
COPY . .

# Port aplikasi (pastikan juga di index.js sesuai PORT env)
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
