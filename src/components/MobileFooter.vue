<template>
    <!-- <div class="fixed-bottom">
        <div class="d-flex">

            <router-link :to="{ name: 'OrderPage', params: { id } }" class="w-50 border-end py-2 text-decoration-none">
                <p class="text-center text-white mb-0">Order</p>
            </router-link>
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
    </div> -->
    <div class="footer-tab-menu">
        <div class="tab-item" @click="goToHome">
            <i class="fas fa-dollar-sign"></i>
            <span>Sales</span>
        </div>
        <div class="tab-item">
            <router-link :to="{ name: 'BarPage', params: { id: bar_id } }" >
                <i class="fas fa-beer"></i>
                <span>Inventory</span>
            </router-link>
        </div>
        <div class="tab-item">
            <router-link :to="{ name: 'PlaceOrder' }" >
                <i class="fas fa-shopping-cart"></i>
                <span>Place Order</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import { useBarsStore } from "@/store/barsStore";
    import { storeToRefs } from "pinia";
    const barsStore = useBarsStore();
    const { bar_id } = storeToRefs(barsStore)
</script>

<style scoped>
    a {
        font-weight: bolder;
        text-decoration: none !important;
    }
    
    .footer-tab-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    }

    .tab-item {
    text-align: center;
    flex: 1;
    }

    .tab-item i {
    font-size: 20px;
    color: #333;
    }

    .tab-item span {
    display: block;
    font-size: 12px;
    margin-top: 5px;
    color: #333;
    }

    .tab-item:hover i, 
    .tab-item:hover span {
    color: #007bff;
    }
</style>