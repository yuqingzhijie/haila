import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import List from '@/views/list'
import Admin from '@/views/admin'
import Product from '@/views/product'
import Cart from '@/views/cart'
import Address from '@/views/address'
import SearchList from '@/views/searchList'
import Order from '@/views/order'
import Introduction from '@/views/introduction'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/list',
			name: 'List',
			component: List
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Admin
		},
		{
			path: '/product',
			name: 'Product',
			component: Product
		},
		{
			path: '/cart',
			name: 'Cart',
			component: Cart
		},
		{
			path: '/address',
			name: 'Address',
			component: Address
		},
		{
			path: '/searchlist',
			name: 'SearchList',
			component: SearchList
		},
		{
			path: '/order',
			name: 'Order',
			component: Order
		},
		{
			path: '/introduction',
			name: 'Introduction',
			component: Introduction
		}
	]
})
