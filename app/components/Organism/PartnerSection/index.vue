<script setup lang="ts">
const partners = [
  "Universitas Jayabaya",
  "Yayasan Islamic Center Alhuda Timah",
  "Sekolah Tinggi Ilmu Ekonomi Jaya Negara Tamansiswa Malang",
  "RW 01 Kelurahan Karang Anyar Kecamatan Sawah Besar Kota Administrasi Jakarta Pusat",
  "PKBM Taman Siswa Jakarta",
  "RW 19 Kelurahan Mustika Jaya Kecamatan Mustika Jaya Kota Bekasi",
  "PT. Duta Amanah Insani",
  "PT. Caturaga Tiara Persada",
];
</script>

<template>
  <section class="partner-section">
    <div class="container">
      <div class="header">
        <h2>Partner STIE Taman Siswa Jakarta</h2>
      </div>

      <div class="grid">
        <div
          v-for="(partner, index) in partners"
          :key="index"
          class="card"
        >
          {{ partner }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-section {
  padding: 80px 20px;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.header h2 {
  font-size: 30px;
  font-weight: 700;
  color: #1f2937;
}

/* GRID */
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* CARD CENTER PERFECT */
.card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  min-height: 120px;

  display: flex;                /* penting */
  align-items: center;          /* vertical center */
  justify-content: center;      /* horizontal center */
  text-align: center;

  font-weight: 500;
  color: #374151;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #16a34a;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transform: translateY(-4px);
}
</style>