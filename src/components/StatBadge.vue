<template>
  <div class="badge" :class="`badge--${variant}`">
    <strong>{{ value }}</strong>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  value: { type: Number, default: 0 },
  label: { type: String, default: '' },
  variant: { type: String, default: 'default' }, // default | success | warn
})
</script>

<style scoped>
.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  border-radius: 4px;
  background: rgba(0,0,0,0.15);
  color: #fff;
}

.badge strong {
  font-size: 18px;
  font-family: 'DM Mono', monospace;
  line-height: 1;
}

.badge span {
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.75;
}

.badge--success { background: rgba(58,125,68,0.5); }
.badge--warn    { background: rgba(255,255,255,0.15); }
</style>
