<template>
	<div class="haila-navbar">
		<div class="container">
			<dl class="haila-navbar-sort">
				<dt>
					<span class="img"></span>
					<span>全部分类</span>
				</dt>
				<dd>
					<img src="./../../static/imgs/iqkplg1m99_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '母婴儿童'}}">母婴儿童</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/iqkpnez751_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '美容彩妆'}}">美容彩妆</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/iqkpo5f994_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '服饰鞋包'}}">服饰鞋包</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/iqkpow3285_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '家居个护'}}">家居个护</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/1c50sn2pn89_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '手表配饰'}}">手表配饰</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/iqkpsh0e98_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '数码家电'}}">数码家电</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/iqkpr75617_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '环球美食'}}">环球美食</router-link>
				</dd>
				<dd>
					<img src="./../../static/imgs/ir26dxt121_40_40.png">
					<router-link :to="{path:'list', query: {keyword: '运动户外'}}">运动户外</router-link>
				</dd>
			</dl>
			<ul class="haila-navbar-list">
				<li>
					<a href="">首页</a>
				</li>
				<li>
					<a href="">国家馆</a>
				</li>
				<li>
					<a href="">全球名店</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			/*freshCategory() {
				this.$emit(fresh);
			}*/
		}
	}
</script>