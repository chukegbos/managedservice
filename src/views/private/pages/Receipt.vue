<template>
    <div class="receipt-container" v-if="items.club">
        <div class="text-center">
            <h2>{{ items.club.name }}</h2>
            <p>{{ items.club.address }} <br> {{ items.club.email }} <br> {{ items.club.phone }}</p>
        </div>
        <div class="receipt-header">
        <div><strong>Sale Code:</strong> {{ items.sale_code }}</div>
        <div><strong>Bar Code:</strong> {{ items.bar_code }}</div>
        <div><strong>Membership ID:</strong> {{ items.membership_id }}</div>
        <div><strong>Mode of Payment:</strong> {{ items.channel_id }}</div>
        <div><strong>Date:</strong> {{ items.created_at }}</div>
        </div>
        <div class="receipt-items">
        <h3>Items</h3>
        <div v-for="item in items.items" :key="item.id" class="item">
            <div>{{ item.inventory_code }}</div>
            <div>{{ item.quantity }} x ₦{{ formatCurrency(item.unit_price) }}</div>
            <div class="item-total">₦{{ formatCurrency(item.total_price) }}</div>
        </div>
        </div>
        <div class="receipt-total">
        <strong>Total:</strong> ₦{{ formatCurrency(items.total) }}
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import { FilterMatchMode } from 'primevue/api';
    import { useBarsStore } from "@/store/barsStore";
    import { axiosUrl } from "@/env";
    import { useRoute } from "vue-router";
    import { storeToRefs } from "pinia";
    import { computed } from 'vue';
    import MobileFooter from "@/components/MobileFooter.vue";
    import { swalErrorHandle, swalSuccessHandle } from "@/components/myHelperFunction";

    const code = ref();
    const items = ref([]);
    const loading = ref(false);
    const barsStore = useBarsStore();
    const route = useRoute();
    const { bars, members, channels, banks, pos } = storeToRefs(barsStore);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).format(value).replace('NGN', '');
    }

    const getData = async () => {
        loading.value = true;
        await axiosUrl
        .get('/sale/' + code.value)
        .then((response) => {
            items.value = response.data.data;
            loading.value = false;
        })
        .catch((error) => {
            loading.value = false;
            swalErrorHandle(error);
        });
    };

    onMounted(() => {
        code.value = route.params.code
        getData();
    });
</script>

<style scoped>
    .receipt-container {
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    font-family: Arial, sans-serif;
    }

    .receipt-header, .receipt-items, .receipt-total {
    margin-bottom: 16px;
    }

    .receipt-header div, .receipt-items .item {
    margin-bottom: 8px;
    }

    .item {
    display: flex;
    justify-content: space-between;
    }

    .item-total {
    font-weight: bold;
    }

    .receipt-total {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    }
</style>
