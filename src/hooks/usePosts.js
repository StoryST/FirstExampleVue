import axios from "axios";
import {ref, onMounted} from 'vue';

export default function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`, {
        params: {
          _page: 1,
          _limit: limit,
        }
      });
      totalPages.value = 100 / limit;
      posts.value = response.data;
    } catch (e) {
      alert('We have error!')
      console.log(e);
    } finally {
      isPostsLoading.value = false;
    }
  }

  onMounted(fetching);
  return {
    posts,
    isPostsLoading,
    totalPages
  }
}