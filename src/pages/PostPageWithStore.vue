<template>
	<div>
		<h1>Posts page</h1>
		<my-input
			v-focus
			:model-value="searchQuery"
			@update:model-value="setSearchQuery"
			placeholder="Search..."
		/>
		<div class="app__btns">
			<my-button
			@click="showDialog"
			>
				Create post
			</my-button>
			<my-select
			  :model-value="selectedSort"
				@update:model-value="setSelectedSort"
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
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
	components: {
		PostForm, PostList
	},
	data() {
		return {
			dialogVisible: false,
		}
	},
	methods: {
		...mapMutations({
			setPage: 'post/setPage',
			setSearchQuery: 'post/setSearchQuery',
			setSelectedSort: 'post/setSelectedSort'
		}),
		...mapActions({
			loadMorePosts: 'post/loadMorePosts',
			fetchPosts: 'posts/fetchPosts',
		}),

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
	},
	mounted() {
		this.fetchPosts();
	}, 
	computed: {
		...mapState({
		  posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions, 
		}),
		...mapGetters({
			sortedPosts: 'post/sortedPosts',
			sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
		})
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