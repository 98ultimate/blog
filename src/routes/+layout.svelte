<script lang="ts">
	import Footer from './footer.svelte'
	import Header from './header.svelte'
    import PageTransition from './transition.svelte'

	import 'open-props/style'
	import 'open-props/normalize'
	import 'open-props/buttons'

	import '../app.css'

	import {
		getLocaleFromNavigator,
		isLoading,
		register,
		init,
		locale
	} from "svelte-i18n";

	init({
		fallbackLocale: "en",
		initialLocale: getLocaleFromNavigator()
	});

	const handleLocaleChange = e => {
		e.preventDefault();
		locale.set(e.target.value);
	};

    export let data
</script>

<div class="layout">

	{#if $isLoading}
		<p>Loading</p>
  	{:else}
		<!-- Header -->
		<Header />

		<!-- Everything else -->
		<main>
			<PageTransition url={data.url}>
				<slot />
			</PageTransition>
		</main>

		<!-- Footer -->
		<Footer />
	{/if}
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);
	}

	main {
		padding-block: var(--size-9);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
