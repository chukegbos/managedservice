<template>
    <div class="content-wrapper">
        <loading :active="isLoading || isLoading2" />
        <div class="receipt-container" v-if="items.club">
            <div class="text-center">
                <h2>{{ items.club.name }}</h2>
                <p>{{ items.club.address }} <br> {{ items.club.email }} <br> {{ items.club.phone }}</p>
            </div>
            <hr>
            <div class="receipt-header">
                <div><strong>Sale Code:</strong> {{ items.sale_code }}</div>
                <div><strong>Bar Code:</strong>{{ items.bar.name }} ({{ items.bar.bar_code }})</div>
                <div><strong>Membership ID:</strong> {{ items.membership_id }}</div>
                <div v-if="items.paid==1"><strong>MOP:</strong>{{ items.mode_of_payment }} ({{ items.channel.name }})</div>
                <div><strong>Date:</strong> {{ formatDate(items.created_at) }}</div>
            </div>
            <hr>
            <hr>
            <div class="receipt-items">
                <h4 class="text-center">ITEMS</h4>
                <div class="item">
                    <div class="item-total">Drinks</div>
                    <div class="item-total">Qty X Unit price</div>
                    <div class="item-total">Total Price</div>
                </div>
                <hr>
                <div v-for="item in items.items" :key="item.id" class="item">
                    <div class="text-center">{{ item.name }}</div>
                    <div class="text-center">{{ item.quantity }} x {{ formatCurrency(item.unit_price) }}</div>
                    <div class="item-total">{{ formatCurrency(item.total_price) }}</div>
                </div>
            </div>
            <hr>
            <div class="receipt-total">
                <strong>Total:</strong> {{ formatCurrency(items.total) }}
            </div>

            <div  class="d-flex justify-content-center">
                <!-- <button type="button" class="btn btn-primary mx-1" v-if="items.paid==0 && items.is_dock==0">Edit</button> -->
                <button type="button" class="btn btn-secondary mx-1" v-if="items.paid==0 && items.is_dock==0" @click="dock()">Dock</button>
                <button type="button" class="btn btn-success mx-1">Print</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from "vue";
    import { axiosUrl } from "@/env";
    import { useRoute } from "vue-router";
    import {
        swalHandler,
        swalErrorHandle,
        swalSuccessHandle
    } from "@/components/myHelperFunction";

    const code = ref();
    const items = ref([]);
    const isLoading = ref(false);
    const route = useRoute();
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const ordinalSuffix = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };

        return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
    }
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        }).format(value).replace('NGN', '');
    }

    const getData = async () => {
        isLoading.value = true;
        await axiosUrl
        .get('/sale/' + code.value)
        .then((response) => {
            items.value = response.data.data;
            isLoading.value = false;
        })
        .catch((error) => {
            isLoading.value = false;
            swalErrorHandle(error);
        });
    };

    const dock = async () => {
        isLoading.value = true;
        await axiosUrl
        .get('/sale/dock/' + code.value)
        .then(() => {
            swalHandler(
                "Success !!",
                "Docker Posted Successfully",
                "success",
                "green"
            );
            getData();
            isLoading.value = false;
        })
        .catch((error) => {
            isLoading.value = false;
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
