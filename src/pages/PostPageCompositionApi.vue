<template>
	<div>
		<h1>Posts page</h1>
		<my-input
			v-focus
			v-model="searchQuery"
			placeholder="Search..."
		/>
		<div class="app__btns">
			<my-button>
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
			<post-form/>
		</my-dialog>
		<post-list 
			:posts="sortedAndSearchedPosts" 
			v-if="!isPostsLoading"
		/>
		<div
		v-else
		>
		Loading posts...
	</div>
	</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import axios from 'axios';
import { ref } from 'vue';
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
	components: {
		PostForm,
    PostList,
    MyButton,
    MySelect,
    MyInput,
	},
	data() {
		return {
      isPostsLoading: false,
			dialogVisible: false,
			sortOptions: [
				{value: 'title', name: 'Name'},
				{value: 'body', name: 'Description'}
			],
		}
	},
  setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

    return{
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
  }
}
</script>

<style scoped>
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