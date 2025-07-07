import { ref, onMounted } from "vue";

export function useIsMobile(num: number, fn?: () => void) {
	const isMobile = ref<boolean>(false);

	onMounted(() => {
		isMobile.value = document.documentElement.clientWidth <= num
	})

	window.addEventListener(
		"resize",
		() => {
			isMobile.value = document.documentElement.clientWidth <= num
			fn && fn()
		},
		false
	);

	return isMobile;
}
