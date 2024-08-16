<template>
    <div>
        <div class="container content">
            <Loading :active="loading" />
            <div class="row">
                <div class="col-6">
                    <h4 class="mx-1">Shopping Cart</h4>
                </div>
                
                <div class="col-6">
                    <h4 class="mx-1"><b>{{ formatCurrency(totalSum) }}</b></h4>
                </div>
            
                <div class="col-12">
                    <div v-if="allItems.length > 0">
                        <div class="mb-2">
                            <label>Select Member Type</label>
                            <select v-model="memberType" class="form-control">
                                <option value="0">Guest</option>
                                <option value="1">Member</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <Dropdown
                                v-if="memberType==1"
                                v-model="membership_id"
                                :options="members"
                                filter="true"
                                optionLabel="fullname"
                                optionValue="membership_id"
                                placeholder="---Select Member --"
                                class="w-100" 
                            />
                        </div>
                        <div class="mb-2">
                            <label>Select Member Type</label>
                            <select v-model="memberType" class="form-control">
                                <option value="0">Guest</option>
                                <option value="1">Member</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <Dropdown
                                v-if="memberType==1"
                                v-model="membership_id"
                                :options="members"
                                filter="true"
                                optionLabel="fullname"
                                optionValue="membership_id"
                                placeholder="---Select Member --"
                                class="w-100" 
                            />
                        </div>
                        <div class="list-all mb-2">
                            <div v-for="item in allItems" :key="item.id" class="list-item">
                                <div class="item-details">
                                    <div class="item-name">{{ item.name }}</div>
                                    <div class="item-info">
                                        <span class="item-available">Available: {{ item.number }}</span>
                                        <span class="item-price">Unit Price: {{ formatCurrency(item.amount_sold) }}</span>
                                    </div>
                                    <div class="item-info">
                                        <span class="">
                                            <label for="quantity">Qty:</label>
                                            <input v-model="item.qty" :max="item.number" value="1" type="number" id="quantity" class="quantity-input">
                                        </span>
                                        <span class="item-price">
                                            Total Price: {{ formatCurrency(item.amount_sold * item.qty) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="d-grid mb-2">
                            <button class="btn btn-info">Submit</button>
                        </div>
                    </div>

                    <div v-else class="mt-2 text-center text-danger">
                    <span v-if="!loading">No Drink Available</span>
                    </div>
                </div>
                
            </div>
        </div>
        <MobileFooter />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from 'primevue/api';
import { useBarsStore } from "@/store/barsStore";
import { axiosUrl } from "@/env";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { computed } from 'vue';
import MobileFooter from "@/components/MobileFooter.vue";
import { swalErrorHandle } from "@/components/myHelperFunction";


const loading = ref(false);
const barsStore = useBarsStore();
const route = useRoute();

const memberType = ref(0);
const allItems = ref([]);
const membership_id = ref();

const nairaSign = ref("&#x20A6;")
const { bars, members } = storeToRefs(barsStore);
const inventory = computed(() => {
    const carts = JSON.parse(localStorage.getItem('cart'));
    const groupedById = carts.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = {
                items: [],
                count: 0
            };
        }
        item.qty = item.qty || 1;
        acc[item.id].items.push(item);
        acc[item.id].count += 1;
        return acc;
    }, {});

    return Object.values(groupedById).map(group => group.items[0]);
});

const totalSum = computed(() => {
    return allItems.value.reduce((sum, item) => {
        return sum + (item.amount_sold * item.qty);
    }, 0);
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    }).format(value).replace('NGN', '');
}

onMounted(() => {
    allItems.value = inventory.value;
});
</script>

<style scoped>
    .list-item {
        /* padding: 10px 0; */
        /* margin: 2px 0; */
        /* border-radius: 5px; */
        
    }

    .list-all {
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #f9f9f9;
        
    }

    .list-item {
    border-bottom: 1px solid #e0e0e0;
    }

    .item-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    }

    .item-name {
        font-weight: bold;
    }

    .item-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    }

    .item-available,
    .item-price {
    font-size: 0.9em;
    }

    .item-quantity {
    }

    .item-quantity label {
    margin-right: 5px;
    }

    .quantity-input {
        width: 60px;
        margin-left: 5px;
    }

    .item-total {
    font-size: 1em;
    font-weight: bold;
    }

    hr {
    width: 100%;
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 10px 0;
    }

    .content {
        padding-bottom: 100px; /* Adjust this value to match the height of the fixed element */
    }
</style>