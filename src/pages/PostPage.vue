<template>
	<div>
		<h1>Posts page</h1>
		<my-input
			v-focus
			v-model="searchQuery"
			placeholder="Search..."
		/>
		<div class="app__btns">
			<my-button
			@click="showDialog"
			>
				Create post
			</my-button>
			<my-select
			  v-model="selectedSort"
				:options="sortOptions"
			/>
		</div>
		<my-dialog
			v-model:show="dialogVisible"
		>
			<post-form 
				@create="createPost" 
			/>
		</my-dialog>
		<post-list 
			:posts="sortedAndSearchedPosts" 
			@remove="removePost"
			v-if="!isPostsLoading"
		/>
		<div
		v-else
		>
		Loading posts...
	</div>
	<div v-intersection="loadMorePosts" class="observer"></div>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios'

export default {
	components: {
		PostForm, PostList
	},
	data() {
		return {
			posts: [],
			dialogVisible: false,
			isPostsLoading: false,
			selectedSort: '',
			searchQuery: '',
			page: 1,
			limit: 10,
			totalPages: 0,
			sortOptions: [
				{value: 'title', name: 'Name'},
				{value: 'body', name: 'Description'}
			]
		}
	},
	methods: {
		createPost(post) {
			this.posts.push(post);
			this.dialogVisible = false;
		},
		removePost(post) {
			this.posts = this.posts.filter(p => p.id !== post.id);
		},
		showDialog() {
			this.dialogVisible = true;
		},
		async fetchPosts() {
			try {
				this.isPostsLoading = true;
					const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`, {
						params: {
							_page: this.page,
							_limit: this.limit,
						}
					});
					this.totalPages = 100 / this.limit;
				  this.posts = response.data;
			} catch(e) {
				alert('We have error!')
			} finally {
				this.isPostsLoading = false;
			}
		},
		async loadMorePosts() {
			try {
				this.page += 1;
					const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`, {
						params: {
							_page: this.page,
							_limit: this.limit,
						}
					});
					this.totalPages = 100 / this.limit;
				  this.posts = [...this.posts, ...response.data];
			} catch(e) {
				alert('We have error!')
			}
		},
	},
	mounted() {
		this.fetchPosts();
	}, 
	computed: {
		sortedPosts() {
			return [...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]));
		},
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
		}
	},
}
</script>

<style>
.app__btns {
	display: flex;
	justify-content: space-between;
	margin: 15px 0;
}

.page__wrapper {
	display: flex;
	margin-top: 15px;
}

.page {
	padding: 10px;
	border: 1px solid black;
}

.current-page {
	color: teal;
	border: 2px solid teal;
}

.observer {
	height: 30px;
}
</style>